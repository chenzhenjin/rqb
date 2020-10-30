<template>
  <div class="">
    <span>{{ text }}</span>
    <button @click="changeText">改变文本</button>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      text: 'hello modal'
    }
  },
  methods: {
    changeText() {
      this.text === 'hello modal' ? (this.text = 'hello are you') : ( this.text = 'hello modal' )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
