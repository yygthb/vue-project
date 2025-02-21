<script>
import { v4 as uuidv4 } from "uuid";
import DropArea from "@/shared/ui/DropArea/DropArea.vue";

export default {
  components: {
    DropArea,
  },

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
      this.handleFiles(event.target.files);
    },

    handleFiles(f) {
      if (!this.isMultiple && this.images.length) {
        return;
      }

      if (!this.isMultiple && this.images.length === this.maxCount) {
        return;
      }

      const files = [...f].slice(0, this.maxCount - this.images.length);

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

      <div class="preview-container">
        <DropArea
          class="drop-area"
          @handleFiles="handleFiles"
          :disabled="!imagesCouldBeAdded"
        >
          <div v-if="images.length" class="images-container">
            <transition-group name="fade">
              <div
                v-for="(img, index) in images"
                :key="index"
                class="img-preview"
              >
                <div class="preview-header">
                  <span class="close" @click="onImgRemove(img)">✕</span>
                  <p class="img-title">{{ img.name }}</p>
                </div>

                <div class="img-wrapper">
                  <img :src="img.src" class="img" />
                </div></div
            ></transition-group>
          </div>
        </DropArea>
      </div>

      <div :class="['upload-footer', !images.length && 'disabled']">
        <button @click="removeAllImages">REMOVE ALL IMAGES</button>
        <button @click="removeAllImages">UPLOAD</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.images-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.img-preview {
  position: relative;
  flex-basis: 150px;
  height: 200px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  background-color: #fff;

  .preview-header {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 35px;
    padding: 0 10px 5px;
    background: linear-gradient(#333, rgba(#838383, 0.3) 75%, transparent);

    .img-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 10px;
      color: #fff;
    }

    .close {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: 1px solid #333;
      background-color: #333;
      color: #fff;
      cursor: pointer;

      &:hover {
        border-color: #fff;
        background-color: #333;
        color: #fff;
      }
    }
  }
}

.img-wrapper {
  height: 100%;
}

.img {
  width: 100%;
  height: 100%;
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

  &.disabled {
    opacity: 0.55;
    pointer-events: none;
  }
}
</style>
