<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    info: {
      type: Array,
      default: [],
    },
  },
};
</script>

<template>
  <div class="page">
    <h1 v-if="title" class="page-title">{{ title }}</h1>
    <ul v-if="info.length" class="page-info">
      <p v-for="i in info" :key="i" class="info">{{ i }}</p>
    </ul>

    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 20px;
}

.page-info {
  margin-bottom: 30px;

  .info {
    margin-bottom: 10px;
  }
}
</style>
