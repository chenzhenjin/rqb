<template>
  <header class="header">
    <span
      v-for="item in tabProps"
      :key="item.value"
      :class="{'is-active': item.value === activeIndex }"
      @click="handleTabClick(item.value)"
    >{{item.label}}</span>
  </header>
</template>

<script>
export default {
  name: 'MyTab',
  props: {
    tabActiveIndex: {
      type: String,
      default: 'click'
    },
    tabProps: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      activeIndex: this.tabActiveIndex
    }
  },
  computed: {},
  watch: {
    tabActiveIndex: function(newVal) {
      this.activeIndex = newVal
    }
  },
  methods: {
    handleTabClick(val) {
      this.activeIndex = val
      console.log('handleTabClick')
      this.$emit('update:tabActiveIndex', val)
      this.$emit('saveCurrentTab')
    }
  },
  created() {
    console.log('tabProps tabActiveIndex',this.tabProps, this.tabActiveIndex)
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: white;
  // border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 10px;
  span {
    position: relative;
    line-height: 250%;
    font-size: 14px;
    cursor: pointer;
    margin-left: 30px;
    &.is-active {
      color: $theme-color;
      font-weight: bold;
    }
    &.is-active::before {
      position: absolute;
      content: '';
      top: 160%;
      left: 50%;
      transform: translateX(-50%);
      width: 95%;
      height: 2px;
      background: $theme-color;
    }
  }
}
</style>
