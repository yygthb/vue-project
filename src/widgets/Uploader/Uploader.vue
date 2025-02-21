<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    isMultiple: {
      type: Boolean,
      default: false,
    },

    maxCount: {
      type: Number,
      default: 10,
    },
  },

  data() {
    return {
      images: [],
    };
  },

  mounted() {
    console.log("this.maxCount: ", this.maxCount);
  },

  methods: {
    onFileChange(event) {
      if (!this.isMultiple && this.images.length) {
        return;
      }

      if (!this.isMultiple && this.images.length === this.maxCount) {
        return;
      }

      let files = [...event.target.files];
      files = files.slice(0, this.maxCount - this.images.length);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          const imgRes = {
            id: uuidv4(),
            name: file.name || e.target.result.substring(0, 30),
            src: e.target.result,
          };
          this.images.push(imgRes);
        };

        reader.readAsDataURL(file);
      }
    },

    onImgRemove(img) {
      this.images = this.images.filter((i) => i.id !== img.id);
    },

    removeAllImages() {
      this.images = [];
    },
  },

  computed: {
    imagesCouldBeAdded() {
      if (this.isMultiple && this.images.length < this.maxCount) {
        return true;
      }

      if (!this.isMultiple && this.images.length === 0) {
        return true;
      }

      return false;
    },

    showDropTitle() {
      return !this.images.length;
    },

    showAddBtn() {
      if (this.isMultiple && this.images.length < this.maxCount) {
        return true;
      }

      return true;
    },

    showFooter() {
      return this.images.length;
    },
  },
};
</script>

<template>
  <div>
    <div class="upload-container">
      <div v-if="imagesCouldBeAdded" class="upload-header">
        <button>
          <span>UPLOAD IMAGES</span>
          <input
            class="upload-btn"
            type="file"
            @change="onFileChange"
            accept="image/*"
            :multiple="isMultiple"
          />
        </button>
      </div>

      <div :class="['preview-container', !showDropTitle && 'hideBorder']">
        <div class="drop-wrapper">
          <span v-if="showDropTitle" class="drop-title"
            >Drop Your Images Here</span
          >

          <input
            :class="[
              'upload-btn',
              !imagesCouldBeAdded && 'upload-btn_disabled',
              // images.length && 'upload-btn_disabled',
            ]"
            type="file"
            @change="onFileChange"
            accept="image/*"
            :multiple="isMultiple"
          />

          <div v-if="images.length" class="images-container">
            <transition-group name="fade">
              <div
                v-for="(img, index) in images"
                :key="index"
                class="img-preview"
              >
                <div class="preview-header">
                  <p class="img-title">{{ img.name }}</p>
                  <span class="close" @click="onImgRemove(img)">✕</span>
                </div>
                <div class="img-wrapper">
                  <img :src="img.src" class="img" />
                </div></div
            ></transition-group>
          </div>
        </div>
      </div>

      <div v-if="showFooter" class="upload-footer">
        <button @click="removeAllImages">REMOVE ALL IMAGES</button>
        <button @click="removeAllImages">UPLOAD</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$preview-header-height: 30px;

input.upload-btn {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;

  background-color: rgba(173, 216, 230, 0.33);
  // opacity: 1;

  &_disabled {
    pointer-events: none;
  }
}

button {
  display: block;
  padding: 5px 10px;
  cursor: pointer;
}

.upload-container {
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 8px 3px #ccc;

  .upload-header {
    button {
      position: relative;
      margin: 0 auto;
    }
  }
}

.upload-header ~ .preview-container {
  margin-top: 20px;
}

.preview-container {
  position: relative;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='lightblue' stroke-width='2' stroke-dasharray='10 1 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 20px;

  &.hideBorder {
    background-image: none;
  }

  .drop-wrapper {
    position: relative;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    // -webkit-transition: background-color 200ms linear;
    // -ms-transition: background-color 200ms linear;
    // transition: background-color 200ms linear;

    // &:hover {
    //   background-color: #f3f3f3;
    // }

    .drop-title {
      position: absolute;
      font-size: 20px;
      opacity: 0.2;
    }
  }
}

.images-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 20px;
}

.img-preview {
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #fff;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    height: $preview-header-height;
    padding: 0 10px;
  }

  .img-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    opacity: 0.3;
  }

  .close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid #777;
    color: #777;
    cursor: pointer;

    &:hover {
      border-color: #333;
      color: #333;
    }
  }
}

.img-wrapper {
  height: 100%;
}

.img {
  width: 100%;
  height: calc(100% - 20px);
  object-fit: contain;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.preview-container ~ .upload-footer {
  margin-top: 20px;
  display: flex;
  justify-content: end;
  gap: 20px;
}
</style>
