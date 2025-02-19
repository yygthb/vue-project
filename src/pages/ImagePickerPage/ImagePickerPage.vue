<script>
import PageWrapper from "@/shared/ui/PageWrapper/PageWrapper.vue";
import FilePond from "@/widgets/ImagePicker/FilePond/FilePond.vue";


export default {
  components: {
    PageWrapper,
    FilePond,
  },

  data() {
    return {
      info: [
        'PQina FilePond: https://github.com/pqina/vue-filepond'
      ]
    };
  },
};
</script>

<template>
  <PageWrapper :title="'Image Picker'" :info="info">
    <FilePond />
  </PageWrapper>
</template>

<style lang="scss" scoped>
</style>
