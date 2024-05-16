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
      text: "str1\nTo use it, simply create a new instance of `ResizeObserver` and call the `observe()` meth o p s t u v w x y z\nTo use it, simply create a new instance of `ResizeObserver` and call the `observe()` meth o p s t u\nq\nw\ne\nr\nt\ny",
      // text: "str1\nstr2\nstr3\nstr4",
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

        <LinedTextarea
          :label="'Ad Group Name'"
          :tip="'Used as part of full name - <user>:<site>-<market>-<language>-<device>-<ad group name>'"
          v-model="text"
          :showAssistInput="true"
        />
        <br />
        <br />
        <br />
        <br />
        <br />

        <p>{{ text }}</p>
        <br />
        <p>textarea content:</p>
        <AppTextarea
          :label="'Ad Group Name'"
          :tip="'Used as part of full name - <user>:<site>-<market>-<language>-<device>-<ad group name>'"
          v-model="text"
        />
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
