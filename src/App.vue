<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div class="app">
    <Header class="header" />

    <main class="main">
      <div class="container">MAIN</div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.app {
  .header {
    margin-bottom: 20px;
  }
}
</style>
