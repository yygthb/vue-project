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
      isReady: false,
      isCropperOpen: false,
    };
  },

  mounted() {
    this.originalImgUrl = this.image.src;

    this.initCropper();
  },

  methods: {
    initCropper() {
      this.cropper = new Cropper(this.$refs.image, {
        responsive: true,
        background: false,
        zoomable: false,
        scalable: false,
        viewMode: 1,
        autoCrop: false,
        autoCropArea: 1,

        ready: () => {
          this.isReady = true;
          console.log("ready");
          // this.cropper.clear();
          // this.cropper.disable();
        },

        crop: function () {
          console.log("crop");
        },
      });
    },

    runCropperHandler() {
      // if (this.isCropperOpen) {
      //   this.clearCropper();
      //   this.disableCropper();
      // } else {
      //   this.cropper.enable();
      //   this.cropper.crop();
      //   this.isCropperOpen = true;
      // }
    },

    clearCropper() {
      this.cropper.enable();
      this.cropper.clear();
    },

    disableCropper() {
      this.cropper.disable();
      this.isCropperOpen = false;
    },

    // rotateRight() {
    //   // console.log(this.cropper.getContainerData());
    //   // console.log(this.cropper.getImageData());
    //   // console.log(this.cropper.getCropBoxData());

    //   this.cropper.rotate(90);
    //   this.replaceCropperUrl();
    // },

    // rotateLeft() {
    //   this.cropper.rotate(-90);
    //   this.replaceCropperUrl();
    // },

    rotateCropper(deg) {
      this.rotate += deg;
      if (Math.abs(this.rotate) === 360) {
        this.rotate = 0;
      }
      this.cropper.rotate(deg);
      this.replaceCropperUrl();
    },

    logCropper() {
      // console.log("cropper: ", this.cropper);
      // console.log(
      //   "cropper getContainerData: ",
      //   this.cropper.getContainerData()
      // );
      // console.log("cropper getImageData: ", this.cropper.getImageData());

      console.log(this.cropper.getContainerData());
      console.log(this.cropper.getImageData());
      console.log(this.cropper.getCropBoxData());
    },

    replaceCropperUrl() {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const imgUrl = croppedCanvas.toDataURL();
      this.cropper.replace(imgUrl);
    },

    alignImg() {
      this.cropper.setAspectRatio(1);
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
        <Loader :class="{ hidden: isReady }" />
        <img :src="image.src" ref="image" class="img hidden" />
      </div>
    </div>
    <div class="cropper-footer">
      <button @click="logCropper">get cropper info</button>
      <button @click="alignImg">set left to 0</button>
      <span title="crop image">
        <CropIcon @click="runCropperHandler" class="icon crop-icon" />
      </span>
      <button @click="clearCropper">clear</button>
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
  background-color: rgba(144, 238, 144, 0.281);
}

.cropper-header {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 30px;
  cursor: pointer;
}

.cropper-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 140px);
  min-height: 400px;
  background-color: rgba(240, 128, 128, 0.199);
}

.img-container {
  width: 100%;
  height: 100%;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(173, 216, 230, 0.219);
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
  gap: 20px;
}

.hidden {
  display: none;
}
</style>
