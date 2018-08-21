<template>
  <div>
    <Table :columns="columns" :data="data1"></Table>
    <div v-show="show==='介质池'" class="btn" style="margin-top:15px">
      <Button type="info" @click="newPool">新建介质池</Button>
      
      <Pool :modal="modal" @close='close'></Pool>
    </div>
    <div v-show="show==='介质'" class="btn" style="margin-top:15px">
      <!-- <Button type="info" @click="newDisk">新建磁盘</Button> -->
      <Button type="info">删除介质</Button>
      <Button type="info">修改介质</Button>
      <Button type="info">格式化</Button>
      <Button type="info">绑定介质池</Button>
      <!-- 			<diskModal></diskModal> -->
    </div>
  </div>
</template>
<script>
import Pool from './pool.vue'
export default {
  props: {
    columns: {
      type: Array
    },
    show: {
      type: String
    }
  },
  components: {
    Pool
  },
  data() {
    return {
      data1: [],
      modal: false
    }
  },
  methods: {
    newPool: function() {
      this.modal = true
    },
    close: function(modal) {
      // console.log('enter close');
      this.modal = modal
    }
  }
}
</script>