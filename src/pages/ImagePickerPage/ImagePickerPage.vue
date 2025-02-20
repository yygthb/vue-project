<script>
import PageWrapper from "@/shared/ui/PageWrapper/PageWrapper.vue";
import FilePond from "@/widgets/ImagePicker/FilePond/FilePond.vue";
import Uploader from "@/widgets/Uploader/Uploader.vue";
import AppImage from "@/shared/ui/AppImage/AppImage.vue";

import { IMG_BLOB_DATA, BASE64_IMG } from "./data";

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
      info: ["PQina FilePond: https://github.com/pqina/vue-filepond"],

      // base64Img: BASE64_IMG,
      // blobImg: null,
      // urlImg: "https://html.com/wp-content/uploads/flamingo.jpg",
    };
  },

  mounted() {
    this.fetchImage();
  },

  methods: {
    fetchImage() {
      fetch(IMG_BLOB_DATA)
        .then((response) => response.blob())
        .then((blob) => {
          this.blobImg = URL.createObjectURL(blob);
        })
        .catch((error) => {
          console.error("img receiving error:", error);
        });
    },
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
      <Uploader :isMultiple="true" :maxCount="10" />
    </div>

    <!-- <hr />
    <div>
      <div class="section">
        <h4 class="section-title">base64</h4>
        <div>
          <AppImage :src="base64Img" :alt="'Base64 Image'" />
        </div>
      </div>

      <div class="section">
        <h4 class="section-title">urlImg</h4>
        <div>
          <AppImage :src="urlImg" :alt="'Base64 Image'" />
        </div>
      </div>

      <div v-if="blobImg" class="section">
        <hr />
        <h4 class="section-title">blob</h4>
        <div>
          <img :src="blobImg" alt="Blob Image" />
        </div>
      </div>
    </div> -->
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
