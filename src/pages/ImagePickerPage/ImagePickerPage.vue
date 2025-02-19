<script>
import PageWrapper from "@/shared/ui/PageWrapper/PageWrapper.vue";
import FilePond from "@/widgets/ImagePicker/FilePond/FilePond.vue";


export default {
  components: {
    PageWrapper,
    FilePond,
  },

  data() {
    return {};
  },
};
</script>

<template>
  <PageWrapper :title="'Image Picker'">
    <FilePond />
  </PageWrapper>
</template>

<style lang="scss" scoped>
</style>
