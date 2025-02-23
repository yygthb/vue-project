<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import RotateLeft from "./ui/RotateLeft.vue";
import RotateRight from "./ui/RotateRight.vue";
import CropIcon from "./ui/CropIcon.vue";

// {
//   "rotate": 90,
//   "scaleX": 1,
//   "scaleY": 1,
//   "naturalWidth": 400,
//   "naturalHeight": 600,
//   "aspectRatio": 0.6666666666666666,
//   "width": 500,
//   "height": 750,
//   "left": 125,
//   "top": -125
// }

export default {
  components: {
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
      isCropperOpen: false,

      width: 0,
      height: 0,
    };
  },

  mounted() {
    this.initCropper();
  },

  methods: {
    initCropper() {
      this.cropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        background: false,
        zoomable: false,
        autoCrop: true,
        autoCropArea: 0.8,

        ready: function () {
          this.cropper.clear();
          this.cropper.disable();
        },
      });
    },

    runCropperHandler() {
      if (this.isCropperOpen) {
        this.clearCropper();
        this.disableCropper();
      } else {
        this.cropper.enable();
        this.cropper.crop();
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

    rotateRight() {
      this.clearCropper();
      this.cropper.rotate(90);
      this.disableCropper();
    },

    rotateLeft() {
      this.clearCropper();
      this.cropper.rotate(-90);
      this.disableCropper();
    },

    logCropper() {
      console.log("cropper: ", this.cropper);
      // console.log(
      //   "cropper getContainerData: ",
      //   this.cropper.getContainerData()
      // );
      // console.log("cropper getImageData: ", this.cropper.getImageData());
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
        <RotateLeft @click="rotateLeft" class="icon rotate-icon" />
      </span>
      <span title="rotate-right">
        <RotateRight @click="rotateRight" class="icon rotate-icon" />
      </span>
    </div>
    <div class="cropper-body">
      <div class="img-container">
        <img :src="image.src" ref="image" class="img" />
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
  background-color: rgba(240, 128, 128, 0.199);
}

.img-container {
  flex: 1;
  width: 100%;
  height: 100%;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(173, 216, 230, 0.219);
}

.img {
  height: 100%;
  width: auto;
}

.cropper-footer {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
