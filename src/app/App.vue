<script>
import Navbar from "@/widgets/Navbar/Navbar.vue";
import TextareaPage from "@/pages/TextareaPage/TextareaPage.vue";

export default {
  components: {
    Navbar,
    TextareaPage,
  },
};
</script>

<template>
  <div class="app">
    <Navbar class="header" />

    <main class="main">
      <div class="container">
        <TextareaPage />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .main {
    flex: 1;
    margin-top: 30px;
    margin-bottom: 50px;
  }
}
</style>
