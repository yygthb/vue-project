<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isHighlighted: false,
    };
  },

  methods: {
    highlight() {
      if (this.disabled) {
        return;
      }

      this.isHighlighted = true;
    },

    unhighlight() {
      this.isHighlighted = false;
    },

    handleDrop(event) {
      if (this.disabled) {
        return;
      }

      const dt = event.dataTransfer;
      const files = dt.files;
      this.handleFiles(files);
      this.unhighlight();
    },

    handleFiles(files) {
      this.$emit("handleFiles", files);
    },
  },
};
</script>

<template>
  <div class="drop-wrapper">
    <div
      id="drop-area"
      @dragover.prevent="highlight"
      @dragleave="unhighlight"
      @drop.prevent="handleDrop"
      :class="{ highlight: isHighlighted, disabled: disabled }"
    >
      <span class="drop-title">Drop Your Images Here</span>
    </div>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.drop-wrapper {
  position: relative;
  min-height: 200px;
}

#drop-area {
  position: absolute;
  width: 100%;
  min-height: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='lightblue' stroke-width='2' stroke-dasharray='10 1 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 20px;

  .drop-title {
    font-size: 32px;
    opacity: 0.2;
  }

  &.disabled {
    background-image: none;

    .drop-title {
      opacity: 0;
    }
  }
}

.highlight {
  background-color: rgba(173, 216, 230, 0.1);
}
</style>
