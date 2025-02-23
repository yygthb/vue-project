<script>
export default {
  props: {
    image: {
      type: Object,
    },
  },
};
</script>

<template>
  <div class="cropper">
    <div class="cropper-header">cropper header</div>
    <div class="cropper-body">
      <div class="img-container">
        <img :src="image.src" alt="" class="img" />
      </div>
    </div>
    <div class="cropper-footer">cropper footer</div>
  </div>
</template>

<style lang="scss" scoped>
.cropper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.cropper-header,
.cropper-footer {
  height: 50px;
  min-height: 50px;
  // background-color: rgba(144, 238, 144, 0.281);
}

.cropper-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgba(240, 128, 128, 0.199);
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
  // background-color: rgba(173, 216, 230, 0.219);
}

.img {
  height: 100%;
  width: auto;
}
</style>
