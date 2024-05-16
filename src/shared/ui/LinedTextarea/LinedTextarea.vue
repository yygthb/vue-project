<script>
import AppInput from "../AppInput/AppInput.vue";

export default {
  components: {
    AppInput,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: false,
    },
    tip: {
      type: String,
      required: false,
    },
    showAssistInput: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      id: null,
      linesCount: [1],
      scrolledLength: 0,
      assistInputValue: "Q",
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

    assistInputEnterHandler() {
      if (this.assistInputValue) {
        const content = this.modelValue
          .split("\n")
          .map((line) => line + this.assistInputValue);

        this.$emit("update:modelValue", content.join("\n"));
      }
    },
  },
};
</script>

<template>
  <div class="app-textarea">
    <textarea class="app-textarea__bufer" ref="bufer" rows="1"></textarea>
    <div class="app-textarea__header">
      <label
        v-if="label"
        :for="id"
        v-text="label"
        class="app-textarea__label"
      ></label>
      <AppInput
        v-if="showAssistInput"
        class="app-textarea__assist-input"
        :label="'Add value to the end'"
        v-model="assistInputValue"
        @onEnter="assistInputEnterHandler"
      />
    </div>
    <div class="app-textarea__container">
      <div class="app-textarea__lines">
        <div class="lines-container" ref="lines">
          <p v-for="(line, index) in linesCount" :key="index" v-html="line"></p>
        </div>
      </div>
      <textarea
        :id="id"
        rows="5"
        class="form-control app-textarea__content"
        :value="modelValue"
        @input="inputHandler"
        v-on:mousedown="onMouseDown"
        v-on:scroll="onScroll"
        ref="textarea"
      ></textarea>
    </div>
    <small v-if="tip" class="tip" v-text="tip"></small>
  </div>
</template>

<style lang="scss" scoped>
$border-radius: 5px;

.app-textarea {
  display: flex;
  flex-direction: column;
  gap: 0.25em;

  .app-textarea__label {
    margin-bottom: 0.25em;
  }

  .tip {
    display: block;
    margin-top: 0.25em;
    color: gray;
  }

  .app-textarea__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .app-textarea__assist-input {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.app-textarea__container {
  display: grid;
  grid-template-columns: 30px 1fr;
  font-size: 13px;
  line-height: 150%;
}

.app-textarea__lines {
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

.app-textarea__bufer,
.app-textarea__content {
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

.app-textarea__bufer {
  visibility: hidden;
  position: absolute;
}
</style>
