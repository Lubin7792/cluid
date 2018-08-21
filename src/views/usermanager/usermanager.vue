<style scoped>
@import './usermanager.css';
</style>
<template>
    <div class="table">
        <Row class="row1">
            <Newuser @input="send" :deleteId="deleteId" @deletebtn="deletecall"></Newuser>
        </Row>
        <Row class="row2">
            <Table :data="tableData1" :columns="tableColumns1" :border='true' @on-selection-change="deleteUser" @on-row-click="onerow" class="rowTable"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="tableData1" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
            <Update :modal="modal1" @change="changeModal" :updateId="updateId" @changeUser="changeUser"></Update>
        </Row>
    </div>
</template>
<script>
import axios from 'axios'
import Newuser from './newuser.vue'
import Update from './update.vue'
import util from '../../libs/util.js'
import $ from 'jquery'
export default {
  components: {
    Newuser,
    Update
  },
  updated: function() {
    $('.allButn').css({ display: 'none' })
    $('tr.ivu-table-row').hover(
      function() {
        $(this)
          .find('.allButn')
          .css('display', 'block')
      },
      function() {
        $(this)
          .find('.allButn')
          .css('display', 'none')
      }
    )
    $('.allButn').hover(
      function() {
        $(this)
          .find('.ivu-icon')
          .css('color', '#2d8cf0')
      },
      function() {
        $(this)
          .find('.ivu-icon')
          .css('color', '#495060')
      }
    )
  },
  data() {
    return {
      tableData1: this.mockTableData1(),
      num: 0,
      modal1: false,
      modaloperation: false,
      deleteId: [],
      unlockId: '',
      updateId: '',
      tableColumns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名称',
          key: 'name'
        },
        {
          title: '密码有效期',
          key: 'period'
        },
        {
          title: '用户登陆地址',
          key: 'ip'
        },
        {
          title: '用户状态',
          key: 'status'
        },
        {
          title: '操作',
          key: 'operation',
          render: (h, params) => {
            return h(
              'div',
              {
                class: {
                  allButn: true
                }
              },
              [
                h('Icon', {
                  props: {
                    type: unlocked,
                    size: 20
                  },
                  nativeOn: {
                    click: () => {
                      let str = 'rest-ful/v3.0/user/unlock/' + this.unlockId
                      util.restfullCall(str, null, 'get', this.unlock)
                      for (let k = 0; k < this.tableData1.length; k++) {
                        if (this.tableData1[k].id == this.unlockId) {
                          this.tableData1[k].status = '正常'
                        }
                      }
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: upload,
                    size: 20
                  },
                  style: {
                    marginLeft: '15px'
                  },
                  nativeOn: {
                    click: () => {
                      let str = 'rest-ful/v3.0/user/unlock/' + this.unlockId
                      util.restfullCall(str, null, 'get', this.unlock)
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: edit,
                    size: 20
                  },
                  style: {
                    marginLeft: '15px'
                  },
                  on: {},
                  nativeOn: {
                    click: () => {
                      this.modal1 = false
                      this.modal1 = true
                    }
                  }
                })
              ]
            )
          }
        }
      ]
    }
  },
  methods: {
    onerow: function(row, index) {
      this.unlockId = row.id
      this.updateId = row.id
    },
    deletecall: function(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < this.tableData1.length; j++) {
          if (arr[i] == this.tableData1[j].id) {
            this.tableData1.splice(j, 1)
          }
        }
      }
    },
    unlock: function(num) {
      // console.log(num);
    },
    judge: function(number) {
      if (number == 0) {
        return '正常'
      }
      if (number == 1) {
        return '锁定'
      }
    },
    changeUser: function(num) {
      for (let k = 0; k < this.tableData1.length; k++) {
        if (this.tableData1[k].id == this.updateId) {
          this.tableData1[k].period = num.period
          this.tableData1[k].ip = num.ip
        }
      }
    },
    send: function(arr) {
      if (!Array.isArray(arr) && arr instanceof Object) {
        this.tableData1.push(arr)
      }
      if (arr.length >= this.tableData1.length) {
        this.tableData1 = arr
      }
      //this.tableData1.push(arr);
    },
    deleteUser: function(name) {
      for (let i = 0; i < name.length; i++) {
        this.deleteId.push(name[i].id)
      }
    },
    senddata: function(obj) {
      var array = new Array()
      for (let i = 0; i < obj.data.length; i++) {
        array.push({
          name: obj.data[i].name,
          period: obj.data[i].pwdperiod,
          ip: obj.data[i].ip,
          status: this.judge(obj.data[i].state),
          id: obj.data[i].id
        })
      }
      this.tableData1 = array
    },
    mockTableData1() {
      util.restfullCall('rest-ful/v3.0/users', null, 'get', this.senddata)
    },
    changePage() {
      this.tableData1 = this.mockTableData1()
    },
    changeModal(str) {
      this.modal1 = str
    },
    showCurrentRow: function(currentRow) {
      // console.log(currentRow);
    }
  }
}
</script>