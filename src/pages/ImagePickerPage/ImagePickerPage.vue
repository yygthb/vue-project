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
      titles: {
        filePond: "FilePond:",
      },
      info: ["PQina FilePond: https://github.com/pqina/vue-filepond"],
    };
  },
};
</script>

<template>
  <PageWrapper :title="'Image Picker'" :info="info">
    <div class="section">
      <h4 class="section-title">{{ titles.filePond }}</h4>
      <FilePond />
    </div>
  </PageWrapper>
</template>

<style lang="scss" scoped>
.section {
  margin-bottom: 40px;
}

.section-title {
  margin-bottom: 10px;
}
</style>
