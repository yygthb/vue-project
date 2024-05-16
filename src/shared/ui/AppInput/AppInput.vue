<script>
export default {
  name: "app-input",

  props: {
    label: {
      type: String,
      required: false,
    },
    modelValue: {
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
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

    onEnter() {
      this.$emit("onEnter");
    },
  },
};
</script>

<template>
  <div class="app-input">
    <label
      v-if="label"
      :for="id"
      v-text="label"
      class="app-input__label"
    ></label>
    <input
      :id="id"
      :value="modelValue"
      @input="inputHandler"
      class="input form-control"
      :placeholder="placeholder"
      v-on:keyup.enter="onEnter"
    />
    <small v-if="tip" class="tip" v-text="tip"></small>
  </div>
</template>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 0.25em;

  .app-input__label {
    // margin-bottom: 0.25em;
  }

  .tip {
    display: block;
    margin-top: 0.25em;
    color: lightgray;
  }
}
</style>
