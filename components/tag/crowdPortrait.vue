<!--
 * @Author: chenzhenjin
 * @email: BrotherStudy@163.com
 * @Date: 2020-10-30 16:45:55
 * @LastEditTime: 2020-10-30 17:25:35
 * @Descripttion: 模块描述
-->
<template>
  <el-form class="character-portrait_form" :model="tag" label-width="80px">
    <el-form-item
      v-for="checkBoxProp in checkBoxProps"
      :key="checkBoxProp.prop"
      :label="checkBoxProp.label"
    >
      <el-checkbox-group
        v-model="tag[checkBoxProp.prop]"
        @change="hanldeCheckBox"
      >
        <el-checkbox
          v-for="option in checkBoxProp.options"
          :key="option"
          :label="option"
          name="checkBoxProp.prop"
        ></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
import categoryList from '@/commonProject/assets/js/categoryOptions.js'
export default {
  name: 'CrowdPortrait',
  props: {
    portraitConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const genderList = ['男', '女']
    const ageList = ['15~20', '20~30', '30~40', '40~50', '50以上']
    const buyList = ['100~500', '500~1000', '1000~5000', '5000以上']
    return {
      checkBoxProps: [
        {
          type: 'checkBox-group',
          label: '类目：',
          prop: 'category',
          options: categoryList
        },
        {
          type: 'checkBox-group',
          label: '性别：',
          prop: 'gender',
          options: genderList
        },
        {
          type: 'checkBox-group',
          label: '年龄段：',
          prop: 'age',
          options: ageList
        },
        {
          type: 'checkBox-group',
          label: '购买力：',
          prop: 'buy',
          options: buyList
        }
      ],
      tag: this.portraitConfig
    }
  },
  watch: {
    portraitConfig: function(newVal){
      this.tag = newVal
      console.log('portraitConfig newVal', newVal)
    }
  },
  created() {
    console.log('crowdPortrait', this.portraitConfig)
  },
  methods: {
    hanldeCheckBox(val) {
      console.log('value', val, this.tag)
      this.$emit('update:portraitConfig', {...this.tag})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
