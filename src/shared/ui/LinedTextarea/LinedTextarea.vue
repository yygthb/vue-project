<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      id: null,
      content: "",
      widthPerChar: 8,
      numPerLine: 1,
      scrolledLength: 0,
    };
  },

  mounted() {
    this.id = this.$.uid;
    // this.content = this.modelValue;
    this.syncScroll(); // ???
  },

  computed: {
    linesCount() {
      // console.log("lines computed, this.content: ", this.content);
      if (this.modelValue === "") return 1;

      return this.modelValue.split("\n").length;
    },
  },

  watch: {
    modelValue() {
      console.log('modelValue watch');
    },
  },

  methods: {
    inputHandler(event) {
      console.log();
      this.$emit("update:modelValue", event.target.value);
      // this.content = event.target.value;
    },

    getCharsCountPerLine() {
      console.log("get chars count per Line");
    },

    onMouseDown() {
      const textarea = this.$refs.textarea;
      console.log("textarea:", textarea);
      const { clientWidth: w, clientHeight: h } = textarea;

      const detect = () => {
        const { clientWidth: newW, clientHeight: newH } = textarea;
        if ((newW !== w) & (newH !== h)) {
          this.getCharsCountPerLine();
        }
      };

      const stop = () => {
        this.getCharsCountPerLine();
        document.removeEventListener("mousemove", detect);
        document.removeEventListener("mouseup", stop);
      };

      document.addEventListener("mousemove", detect);
      document.addEventListener("mouseup", stop);
    },

    onScroll(e) {
      this.scrolledLength = e.target.scrollTop;
      this.syncScroll();
    },

    syncScroll() {
      this.$refs.lines.style.transform = `translateY(${-this
        .scrolledLength}px)`;
    },

    log() {
      console.log(this.modelValue);
    },
  },
};
</script>

<template>
  <div class="textarea-container">
    <div class="textarea-lines-count">
      <div class="lines-container" ref="lines">
        <p v-for="(line, index) in linesCount" :key="index" v-html="line"></p>
      </div>
    </div>
    <textarea
      :id="id"
      rows="5"
      class="form-control"
      :value="modelValue"
      @input="inputHandler"
      v-on:mousedown="onMouseDown"
      v-on:scroll="onScroll"
      ref="textarea"
    ></textarea>
  </div>

  <br />
  <button @click="log">LOG</button>
</template>

<style lang="scss" scoped>
$border-radius: 5px;

.textarea-container {
  display: grid;
  grid-template-columns: 30px 1fr;
  font-size: 13px;
  line-height: 150%;
}

.textarea-lines-count {
  position: relative;
  overflow: hidden;
  padding: 6px 5px;
  border-top-left-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  background-color: rgb(228, 228, 228);
  // font-family: Helvetica, monospace;

  .lines-container {
    position: absolute;
    right: 5px;
    text-align: end;
  }
}

textarea {
  padding: 5px;
  border: 1px solid lightgray;
  border-left: none;
  border-top-right-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  font-size: 13px;
  line-height: 150%;
  outline: none;
  // font-family: Helvetica, monospace;
}

.app-textarea {
  display: flex;
  flex-direction: column;

  .app-textarea__label {
    margin-bottom: 0.25em;
  }

  .tip {
    display: block;
    margin-top: 0.25em;
    color: gray;
  }

  textarea {
    min-height: 38px;
    height: 96px;
  }
}
</style>
