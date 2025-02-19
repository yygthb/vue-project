<script>
import PageWrapper from "@/shared/ui/PageWrapper/PageWrapper.vue";
import LinedTextarea from "@/shared/ui/LinedTextarea/LinedTextarea.vue";
import AppTextarea from "@/shared/ui/AppTextarea/AppTextarea.vue";

export default {
  components: {
    PageWrapper,
    LinedTextarea,
    AppTextarea,
  },

  data() {
    return {
      text: "str1\nTo use it, simply create a new instance of `ResizeObserver` and call the `observe()` meth o p s t u v w x y z\nTo use it, simply create a new instance of `ResizeObserver` and call the `observe()` meth o p s t u\nq\nw\ne\nr\nt\ny",
    };
  },
};
</script>

<template>
  <PageWrapper :title="'Lined Textarea'">
    <LinedTextarea
      class="lined-textarea"
      :label="'Ad Group Name'"
      :tip="'Used as part of full name - <user>:<site>-<market>-<language>-<device>-<ad group name>'"
      v-model="text"
      :showAssistInput="true"
    />

    <p class="textarea-text">{{ text }}</p>

    <AppTextarea
      :label="'Ad Group Name'"
      :tip="'Used as part of full name - <user>:<site>-<market>-<language>-<device>-<ad group name>'"
      v-model="text"
    />
  </PageWrapper>
</template>

<style lang="scss" scoped>
.lined-textarea {
  margin-bottom: 20px;
}

.textarea-text {
  margin-bottom: 20px;
}
</style>
