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
      linesCount: [1],
      scrolledLength: 0,
    };
  },

  mounted() {
    this.id = this.$.uid;
    this.calculateLinesCount();
  },

  watch: {
    modelValue() {
      this.calculateLinesCount();
    },
  },

  created() {
    window.addEventListener("resize", this.screenWidthHandler);
  },

  destroyed() {
    window.removeEventListener("resize", this.screenWidthHandler);
  },

  methods: {
    inputHandler(event) {
      this.$emit("update:modelValue", event.target.value);
      this.calculateLinesCount();
    },

    calculateLinesCount() {
      if (this.modelValue === "") {
        this.linesCount = [1];
        return;
      }

      const resultLines = [];
      const lines = this.modelValue.split("\n");
      lines.forEach((line, idx) => {
        resultLines.push(idx + 1);
        const wrapCount = this.calculateStringLines(line) - 1;
        for (let i = 0; i < wrapCount; i++) {
          resultLines.push("&nbsp;");
        }
      });

      this.linesCount = resultLines;
    },

    calculateStringLines(str) {
      const t = this.$refs.textarea;
      const b = this.$refs.bufer;

      const cs = window.getComputedStyle(t);
      const lh = isNaN(parseInt(cs.lineHeight))
        ? parseInt(cs.fontSize)
        : parseInt(cs.lineHeight);

      b.style.width = t.clientWidth + 1 + "px";
      b.value = str;

      const res = Math.floor(b.scrollHeight / lh);
      if (res == 0) res = 1;
      return res;
    },

    onMouseDown() {
      const textarea = this.$refs.textarea;
      const { clientWidth: w, clientHeight: h } = textarea;
      const detect = () => {
        const { clientWidth: newW, clientHeight: newH } = textarea;
        if ((newW !== w) & (newH !== h)) {
          this.calculateLinesCount();
        }
      };
      const stop = () => {
        this.calculateLinesCount();
        document.removeEventListener("mousemove", detect);
        document.removeEventListener("mouseup", stop);
      };
      document.addEventListener("mousemove", detect);
      document.addEventListener("mouseup", stop);
    },

    onScroll(e) {
      this.scrolledLength = e.target.scrollTop;
      this.syncLinesScroll();
    },

    syncLinesScroll() {
      this.$refs.lines.style.transform = `translateY(${-this
        .scrolledLength}px)`;
    },

    screenWidthHandler() {
      this.calculateLinesCount();
    },
  },
};
</script>

<template>
  <textarea class="bufer" ref="bufer" rows="1"></textarea>
  <div class="textarea-container">
    <div class="textarea-lines-count">
      <div class="lines-container" ref="lines">
        <p v-for="(line, index) in linesCount" :key="index" v-html="line"></p>
      </div>
    </div>
    <textarea
      :id="id"
      rows="5"
      class="form-control app-textarea"
      :value="modelValue"
      @input="inputHandler"
      v-on:mousedown="onMouseDown"
      v-on:scroll="onScroll"
      ref="textarea"
    ></textarea>
  </div>
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

  .lines-container {
    position: absolute;
    right: 5px;
    text-align: end;
  }
}

.bufer,
.app-textarea {
  padding: 5px;
  border: 1px solid lightgray;
  border-left: none;
  border-top-right-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  font-size: 13px;
  line-height: 150%;
  outline: none;
  font-family: monospace;
  resize: vertical;
}

.bufer {
  visibility: hidden;
  position: absolute;
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
