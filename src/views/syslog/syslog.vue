<style>
@import './syslog.css';

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
    <syscontent ref="syscontent"></syscontent>
  </div>

</template>
<script>
import axios from 'axios'
import util from '../../libs/util.js'
import Syscontent from './syscontent.vue'
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
      this.$refs.syscontent.logfile()
    }
  },
  components: {
    Syscontent
  }
}
</script>