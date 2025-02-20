<script>
export default {
  props: {
    src: {
      type: String,
    },
    alt: {
      type: Text,
    },
  },

  data() {
    return {};
  },
};
</script>

<template>
  <div class="img-wrapper">
    <img class="img" :src="src" />
  </div>
</template>

<style lang="scss" scoped>
</style>
