<template>
<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" class="edit-button">
  <circle class="circle" cx="20" cy="20" r="19" stroke="#333" stroke-width="2" fill="#333" />
  <svg width="40" height="40" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z" fill="#fff" fill-rule="nonzero"></path>
  </svg>
</svg>
</template>

<style lang="scss" scoped>
.edit-button {
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
