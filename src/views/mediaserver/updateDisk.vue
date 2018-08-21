<style>
@import './diskModal.css';
</style>
<template>
  <Modal title="修改磁盘设备" v-model="modal" class-name="vertical-center-modal" @on-ok="ok" @on-cancel="cancel" ok-text="保存" cancel-text="取消" width="518">
    <Form :model="diskItem">
      <FormItem label="设备名称">
        <Input v-model="diskItem.name" placeholder="请输入设备名称..." style="width: 415px"></Input>
      </FormItem>
      <FormItem>
        <span>介质服务器</span>
        <Dropdown style="margin-left: 20px">
          <Button type="primary">
            下拉菜单
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem disabled>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem divided>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </FormItem>
      <FormItem label="设备路径">
        <Input v-model="diskItem.path" style="width: 360px"></Input>
        <Button type="primary" @click="glance">浏览</Button>
        <!-- <Glance></Glance> -->
      </FormItem>
      <FormItem label="最大并发任务数" class="max">
        <Input v-model="diskItem.max" style="width: 150px"></Input>
      </FormItem>
      <FormItem label="容量告警下限" class="min">
        <Input v-model="diskItem.min" style="width: 150px"></Input>
      </FormItem>
      <FormItem class="document">
        <Checkbox v-model="single">定制介质文件</Checkbox>
        <FormItem label="介质文件容量" class="caption" v-if="single===true">
          <Input v-model="diskItem.caption" style="width: 150px"></Input> (M)
        </FormItem>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import Glance from './glance.vue'
import util from '../../libs/util.js'
export default {
  data() {
    return {
      diskItem: {
        name: '',
        path: '',
        max: '',
        min: ''
      },
      single: false
    }
  },
  components: {
    Glance
  },
  // mounted:function(){
  // 	console.log(this.single);
  // },
  // updated:function(){
  // 	console.log(this.single);
  // },
  props: {
    modal: {
      type: Boolean
    }
  },
  methods: {
    ok() {
      let url = 'rest-ful/v3.0/device'
      // let newData={
      // 	type:0,

      // };
      //  util.restfullCall(url, newData, 'post',(obj)=>{

      //  });
      this.$emit('close', false)
    },
    cancel() {
      this.$emit('close', false)
    },
    glance: function() {
      this.$store.commit('getModalGlance', true)
    }
  }
}
</script>