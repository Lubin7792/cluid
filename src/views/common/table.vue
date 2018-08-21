<template>
    <div>
        <Table class="lubin2" border :columns="columns" :data="data" @on-row-click="getRowData" @add="addFromChild"></Table>
        <!-- 新增组件 -->
        <Add></Add>
        <!-- 修改组件 -->
        <Update></Update>
    </div>
</template>
<script>
import util from '../../libs/util.js'
import Add from './add.vue'
import Update from './update.vue'
export default {
  props: {
    columns: {
      type: Array
    },
    data: {
      type: Array
    },
    search: {
      type: String
    }
  },
  components: {
    Add,
    Update
  },
  data() {
    return {
      //title
      columns: [],
      data: this.getData,
      message: this.message,
      addData: {},
      updateData: {},
      clientId: ''
    }
  },
  mounted: function() {
    //获取数据接口
    util.restfullCall(this.search, null, 'get', this.searchDataFormat)
  },
  methods: {
    //获取数据所需的返回值
    searchDataFormat: function(obj) {
      this.$emit('searchFromTable', obj.data)
    },
    //获取当前行的ID
    getRowData: function(row, index) {
      this.clientId = row.id
      this.$store.commit('getClientId', this.clientId)
      this.$emit('getFromParent', this.clientId)
    }
  }
}
</script>
