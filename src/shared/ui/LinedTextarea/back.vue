<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      id: null,
      content: "",
    };
  },

  mounted() {
    console.log('this.value: ', this.value);

    this.id = this.$.uid;
    this.content = this.value;
  },

  computed: {
    lines() {
      if (this.content === "") return [1];
    },
  },

  methods: {
    inputHandler(event) {
      console.log();
      // this.$emit("update:value", event.target.value);
      // this.content = event.target.value;
    },

    log() {
      console.log(this.content);
    },
  },
};
</script>

<template>
  <div class="textarea-container">
    <div class="textarea-lines-count" ref="lines">
      <p v-for="(line, index) in lines" :key="index" v-html="line"></p>
    </div>
    <textarea
      :id="id"
      rows="5"
      :value="content"
      @input="inputHandler"
      class="form-control"
    ></textarea>
  </div>

  <button @click="log">LOG</button>
</template>

<style lang="scss" scoped>
.textarea-container {
  display: grid;
  grid-template-columns: 30px 1fr;
}

.textarea-lines-count {
  padding: 0 5px;
  text-align: end;
  background-color: lightgray;
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
