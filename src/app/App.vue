<script>
import Navbar from "@/widgets/Navbar/Navbar.vue";
import LinedTextarea from "@/shared/ui/LinedTextarea/LinedTextarea.vue";
import AppTextarea from "@/shared/ui/AppTextarea/AppTextarea.vue";

export default {
  components: {
    Navbar,
    LinedTextarea,
    AppTextarea,
  },

  data() {
    return {
      text: "str1\nstr2\nstr3\nstr4\nstr5\nstr6\nstr7\nstr8\nstr9",
    };
  },
};
</script>

<template>
  <div class="app">
    <Navbar class="header" />

    <main class="main">
      <div class="container">
        <h1>MAIN PAGE</h1>

        <br />
        <p>lined textarea</p>
        <LinedTextarea v-model="text" />
        <br />
        <br />
        <p>{{ text }}</p>
        <br />
        <p>textarea content:</p>
        <AppTextarea v-model="text" />
      </div>
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
