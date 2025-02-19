<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <div class="page">
    <h1 v-if="title" class="page-title">{{ title }}</h1>

    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 30px;
}
</style>
