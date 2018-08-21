<style>
@import './syslog.css';
.sys-conten .ivu-table td,td {
  border-bottom:none;
}
.sys-conten .ivu-table-header th{
  border-bottom: 2px solid #fd7549;
  height: 50px;
  background-color: #fff;
}
.sys-conten .ivu-table-tbody tr:nth-child(even){

background-color: #f9efe9;

}
.sys-conten .ivu-table-tbody td{
  background-color: transparent;
}
.sys-conten .ivu-table-tbody tr:hover{
  background-color: azure;
}
.sys-one .ivu-table-cell p{
    color:#666666;
}
.sys-two .ivu-table-cell p{
    color:#fd7549;
}
.sys-three .ivu-table-cell p{
    color:#b41c21;
}
.sysdesc .ivu-table-cell {
  width: 300px;
  height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.sysmodal .ivu-modal-footer {
  border-top: none;
}
</style>
<template>
  <div>
    <div class="sys-header">
      <span class="ml0">级别:</span>
      <Select v-model="model1" style="width:170px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span>用户:</span>
      <Input v-model="model1" readonly style="width: 100px;" />
      <span>来源:</span>
      <Input v-model="model1" readonly style="width: 100px;" />
      <span>时间:</span>
      <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width:200px"></DatePicker>
      <div class="lr">
        <Button type="warning" @click="refresh">刷新</Button>
      </div>
    </div>
    <sysconten ref="sysconten"></sysconten>
  </div>

</template>
<script>
import axios from 'axios'
import util from '../../libs/util.js'
import Sysconten from './sysconten.vue'
export default {
  data() {
    return {
      cityList: [
        {
          value: 'Admin',
          label: 'Admin'
        },
        {
          value: 'London',
          label: 'London'
        }
      ],
      model1: ''
    }
  },
  methods: {
    // give() {
    //   util.restfullCall('rest-ful/v3.0/syslogs',null,'get',obj => {
    //     console.log(obj)})
    // }
    refresh() {
      this.$refs.sysconten.logfile()
    }
  },
  components: {
    Sysconten
  }
}
</script>