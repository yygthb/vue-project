<template>
  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" class="close-button">
    <circle class="circle" cx="20" cy="20" r="18" stroke="#333" stroke-width="2" fill="#333" />
    <line x1="12" y1="12" x2="28" y2="28" stroke="#fff" stroke-width="3" />
    <line x1="28" y1="12" x2="12" y2="28" stroke="#fff" stroke-width="3" />
  </svg>
</template>

<style lang="scss" scoped>
.close-button {
  cursor: pointer;

  .circle {
    stroke: #333;
    fill: #333;
  }

  &:hover {
    .circle {
      stroke: #fff;
      fill: #555;
    }
  }
}
</style>
