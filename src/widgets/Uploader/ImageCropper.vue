<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

import Loader from "@/shared/ui/Loader/Loader.vue";
import RotateLeft from "./ui/RotateLeft.vue";
import RotateRight from "./ui/RotateRight.vue";
import CropIcon from "./ui/CropIcon.vue";

export default {
  components: {
    Loader,
    RotateLeft,
    RotateRight,
    CropIcon,
  },

  props: {
    image: {
      type: Object,
    },
  },

  data() {
    return {
      cropper: null,
      originalImgUrl: "",
      rotate: 0,
      isLoading: false,
      error: "",
      isCropperOpen: false,
    };
  },

  beforeMount() {
    this.isLoading = true;
  },

  mounted() {
    this.originalImgUrl = this.image.src;

    const img = new Image();
    img.src = this.image.src;
    img.onload = () => {
      this.initCropper();
    };
    img.onerror = (e) => {
      this.isLoading = false;
      this.error = "IMAGE LOADING ERROR";
      throw new Error("image onload error", e);
    };
  },

  methods: {
    initCropper() {
      this.cropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        responsive: true,
        background: false,
        zoomable: false,
        scalable: true,
        autoCrop: false,
        autoCropArea: 1,
        background: true,

        ready: () => {
          this.isLoading = false;
          console.log("ready");
          this.cropper.clear();
          this.cropper.disable();
        },

        error: () => {
          console.log("error");
          this.isLoading = false;
        },

        crop: () => {
          console.log("crop");
        },
      });
    },

    fitCropBoxToImage(offset = 0) {
      const canvasData = this.cropper.getCanvasData();
      this.cropper.setCropBoxData({
        left: canvasData.left + offset,
        top: canvasData.top + offset,
        width: canvasData.width - offset * 2,
        height: canvasData.height - offset * 2,
      });
    },

    handleScaleImg() {
      this.cropper.scale(1);
      const containerData = this.cropper.getContainerData();
      containerData.aspectRatio = containerData.width / containerData.height;

      const imgData = this.cropper.getImageData();
      const isHoriz = imgData.aspectRatio > 1;

      if (isHoriz && [90, 270, -90, -270].includes(imgData.rotate)) {
        this.cropper.scale(containerData.height / imgData.width);
      }

      if (!isHoriz && [90, 270, -90, -270].includes(imgData.rotate)) {
        if (containerData.aspectRatio < 1) {
          this.cropper.scale(containerData.width / imgData.height);
        } else {
          this.cropper.scale(containerData.height / imgData.width);
        }
      }
    },

    runCropperHandler() {
      if (this.isCropperOpen) {
        this.clearCropper();
        this.disableCropper();
      } else {
        this.cropper.enable();
        this.cropper.crop();
        this.fitCropBoxToImage(50);
        this.isCropperOpen = true;
      }
    },

    clearCropper() {
      this.cropper.enable();
      this.cropper.clear();
    },

    disableCropper() {
      this.cropper.disable();
      this.isCropperOpen = false;
    },

    rotateCropper(deg) {
      this.clearCropper();
      this.rotate += deg;
      if (Math.abs(this.rotate) === 360) {
        this.rotate = 0;
      }
      this.cropper.rotate(deg);

      this.fitCropBoxToImage();
      this.handleScaleImg();
      this.disableCropper();
    },

    logCropper() {
      const containerData = this.cropper.getContainerData();
      containerData.aspectRatio = containerData.width / containerData.height;
      console.log("containerData: ", containerData);

      const imgData = this.cropper.getImageData();
      console.log("imgData: ", imgData);
    },
  },

  beforeDestroy() {
    if (this.cropper) {
      this.cropper.destroy();
    }
  },
};
</script>

<template>
  <div class="cropper">
    <div class="cropper-header">
      <span title="rotate-left">
        <RotateLeft @click="rotateCropper(-90)" class="icon rotate-icon" />
      </span>
      <span title="rotate-right">
        <RotateRight @click="rotateCropper(90)" class="icon rotate-icon" />
      </span>
    </div>
    <div class="cropper-body">
      <div class="img-container">
        <Loader :class="{ hidden: !isLoading }" />
        <p v-if="error" class="error">IMAGE LOADING ERROR</p>
        <img :src="image.src" ref="image" class="img hidden" />
      </div>
    </div>
    <div class="cropper-footer">
      <button @click="logCropper">get cropper info</button>
      <span title="crop image">
        <CropIcon
          @click="runCropperHandler"
          class="icon crop-icon"
          :isActive="isCropperOpen"
        />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  padding: 5px 10px;
  font-size: 20px;
}

.cropper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 20px;
}

.cropper-header,
.cropper-footer {
  height: 50px;
  min-height: 50px;
}

.cropper-header {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.cropper-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 140px);
  min-height: 400px;
  // background-color: rgba(240, 128, 128, 0.199);
}

.img-container {
  width: 100%;
  height: 100%;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e6f4fc;
}

.img,
img {
  display: block;
  height: 100%;
  width: auto;
  max-width: 100%;
}

.cropper-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.error {
  font-weight: 700;
  font-size: 22px;
  color: #f0a496;
}

.hidden {
  display: none;
}
</style>
