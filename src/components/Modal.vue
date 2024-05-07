<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasTitleSlot() {
      return !!this.$slots.modalTitle;
    },
    hasBodySlot() {
      return !!this.$slots.modalBody;
    },
    hasFooterSlot() {
      return !!this.$slots.modalFooter;
    },
  },

  methods: {
    closeModal: function () {
      this.$emit("update:show", false);
    },
  },
};
</script>

<template>
  <div v-if="show" class="app-modal-overlay" @click="closeModal">
    <div @click.stop class="app-modal__container">
      <div @click="closeModal" class="app-modal__close">
        <span></span>
        <span></span>
      </div>
      <div v-if="hasTitleSlot" class="app-modal__section app-modal__header">
        <slot name="modalTitle" />
      </div>
      <div v-if="hasBodySlot" class="app-modal__section app-modal__body">
        <slot name="modalBody" />
      </div>
      <div v-if="hasFooterSlot" class="app-modal__section app-modal__footer">
        <slot name="modalFooter" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-modal-overlay {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(black, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;

  .app-modal__container {
    position: relative;
    width: 100%;
    max-width: 350px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    background-color: #fff;
  }

  .app-modal__close {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    width: 14px;
    height: 14px;
    cursor: pointer;

    &::before,
    &::after {
      position: absolute;
      display: block;
      content: "";
      height: 4px;
      width: 18px;
      border-radius: 2px;
      background-color: #666;
    }

    &::before {
      transform: translate(-2px, 6px) rotate(-45deg);
    }

    &::after {
      transform: translate(-2px, 6px) rotate(45deg);
    }

    &:hover {
      &::before,
      &::after {
        background-color: #222;
      }
    }
  }

  .app-modal__section {
    padding: 16px;

    & ~ .app-modal__section {
      border-top: 1px solid #e3e6f0;
    }
  }

  .app-modal__body {
    max-height: 400px;
    overflow: auto;
  }

  .app-modal__header {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
