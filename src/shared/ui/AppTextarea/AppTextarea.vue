<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
    },
    tip: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      id: null,
    };
  },

  mounted() {
    this.id = this.$.uid;
  },

  methods: {
    inputHandler(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<template>
  <div class="app-textarea">
    <label
      v-if="label"
      :for="id"
      v-text="label"
      class="app-textarea__label"
    ></label>
    <textarea
      :id="id"
      rows="5"
      :value="modelValue"
      @input="inputHandler"
      class="textarea form-control"
    ></textarea>
    <small v-if="tip" class="tip" v-text="tip"></small>
  </div>
</template>

<style lang="scss" scoped>
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
