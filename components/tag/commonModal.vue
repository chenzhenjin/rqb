<template>
  <div class="modal">
    <div class="modal-content" :style="{width: `${width}px`}">
      <p class="header">{{headerText}}</p>
      <div class="border-close" @click="close">
        <i class="el-icon-close"></i>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonModal',
  props: {
    headerText: {
      type: String,
      default: ''
    },
    width: {
      default: 500
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin backgroundButton {
  &.el-button {
    color: white;
    background-color: $theme-color;
    border-radius: 15px;
    padding: 9px 46px;
  }
}
@mixin borderButton {
  &.el-button {
    color: $theme-color;
    border: 1px solid $theme-color;
    border-radius: 15px;
    padding: 9px 46px;
  }
}
.modal {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2001;
  display: flex;
  justify-content: center;
  align-items: center;
  .border-close {
    width: 28px;
    height: 28px;
    position: relative;
    border: 1px solid white;
    border-radius: 50%;
    left: 102%;
    top: -35px;
    .el-icon-close {
      position: absolute;
      color: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px !important;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .modal-content {
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    .header {
      font-size: 16px;
      font-weight: bold;
      padding-top: 21px;
      text-align: center;
    }
    .content {
      text-align: center;
      font-size: 14px;
      .explain {
        width: 80%;
        text-align: center;
        margin: 0 auto;
        .money {
          color: $theme-color;
          font-weight: bold;
        }
      }
      .refence-link {
        text-align: left;
        margin: 6px 50px 0;
        color: $theme-color;
      }
      .bold {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      /deep/ .el-input {
        width: 85%;
      }
      /deep/ .text-btn {
        &.el-button {
          margin-right: 10px;
          @include borderButton;
        }
      }
      /deep/ .background-btn {
        @include backgroundButton;
        margin: 39px 0;
        // &.el-button--danger {
        //   margin: 15px 0 39px;
        //   background-color: $theme-color;
        //   @include borderButton;
        // }
      }
    }
    // .close-content {
    //   @extend .content;
    //   margin: -50px 0 0;
    //   /deep/ .text-btn {
    //     margin-bottom: 15px;
    //   }
    // }
  }
}
</style>
