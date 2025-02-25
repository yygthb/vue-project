<script>
import PageWrapper from "@/shared/ui/PageWrapper/PageWrapper.vue";
import FilePond from "@/widgets/ImagePicker/FilePond/FilePond.vue";
import Uploader from "@/widgets/Uploader/Uploader.vue";
import AppImage from "@/shared/ui/AppImage/AppImage.vue";

export default {
  components: {
    PageWrapper,
    FilePond,
    Uploader,
    AppImage,
  },

  data() {
    return {
      filePondTitle: "FilePond",
      uploaderTitle: "Image Uploader",
      info: [
        // "PQina FilePond: https://github.com/pqina/vue-filepond",
        "Vue Component via CropperJS: https://github.com/fengyuanchen/cropperjs/",
      ],
    };
  },
};
</script>

<template>
  <PageWrapper :title="'Image Picker'" :info="info">
    <!-- <div class="section">
      <h4 class="section-title">{{ filePondTitle }}</h4>
      <FilePond />
    </div> -->

    <div class="section">
      <h4 class="section-title">{{ uploaderTitle }}</h4>
      <Uploader :isMultiple="true" :maxCount="22" />
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
