<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

import Loader from "@/shared/ui/Loader/Loader.vue";
import RotateLeft from "./ui/RotateLeft.vue";
import RotateRight from "./ui/RotateRight.vue";
import CropIcon from "./ui/CropIcon.vue";

const staticData = {
  ASPECT_RATIO_FREE: 0,
  ASPECT_RATIO_1x1: 1, //  1 / 1
  ASPECT_RATIO_16x9: 1.78, // 16 / 9
  ASPECT_RATIO_4x3: 1.33, //  4 / 3
};

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
      cropBox: {
        isOpened: false,
        aspectRatio: null,
      },
      staticData,
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
          this.cropper.clear();
          this.cropper.disable();
        },

        error: (e) => {
          console.log("Cropper Init Error", e);
          this.isLoading = false;
        },
      });
    },

    runCropper(aspectRatio) {
      if (typeof this.cropBox.aspectRatio === "number") {
        if (this.cropBox.aspectRatio === aspectRatio) {
          this.disableCropBox();
        } else {
          this.disableCropBox();
          this.enableCropBox(aspectRatio);
        }
      } else {
        this.enableCropBox(aspectRatio);
      }
    },

    enableCropBox(aspectRatio = 0) {
      this.cropBox.isOpened = true;
      this.cropBox.aspectRatio = aspectRatio;
      this.cropper.enable();
      this.cropper.setAspectRatio(aspectRatio);
    },

    clearCropBox() {
      this.cropBox = {
        isOpened: false,
        aspectRatio: null,
      };
      this.cropper.enable();
      this.cropper.clear();
    },

    disableCropBox() {
      this.clearCropBox();
      this.cropper.disable();
    },

    rotateCropper(deg) {
      this.clearCropBox();
      this.rotate += deg;
      if (Math.abs(this.rotate) === 360) {
        this.rotate = 0;
      }
      this.cropper.rotate(deg);

      // this.fitCropBoxToImage();
      this.handleScaleImg();
      this.disableCropBox();
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
      <!-- <button @click="logCropper">get cropper info</button> -->
      <CropIcon
        @click="runCropper(staticData.ASPECT_RATIO_FREE)"
        :isActive="cropBox.aspectRatio === staticData.ASPECT_RATIO_FREE"
        :text="'FREE'"
      />
      <CropIcon
        @click="runCropper(staticData.ASPECT_RATIO_1x1)"
        :isActive="cropBox.aspectRatio === staticData.ASPECT_RATIO_1x1"
        :text="'1x1'"
      />
      <CropIcon
        @click="runCropper(staticData.ASPECT_RATIO_16x9)"
        :isActive="cropBox.aspectRatio === staticData.ASPECT_RATIO_16x9"
        :text="'16x9'"
      />
      <CropIcon
        @click="runCropper(staticData.ASPECT_RATIO_4x3)"
        :isActive="cropBox.aspectRatio === staticData.ASPECT_RATIO_4x3"
        :text="'4x3'"
      />
      <button @click="clearCropBox">clear cropper</button>
      <button @click="disableCropBox">disable cropper</button>
      <button @click="cropImage" class="save-btn">SAVE</button>
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

.save-btn {
  margin-left: auto;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 5px;
  font-size: 16px;
  color: #333;

  &:hover {
    background-color: #57c757;
    border-color: #57c757;
    color: #fff;
  }
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
