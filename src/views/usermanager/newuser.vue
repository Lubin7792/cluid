<style scoped>
@import './newuser.css';
</style>
<template>
    <div>
        <Button type="warning" @click="refresh" class="refreshButton">
            <Icon type="person-add" :size='16'></Icon>
            刷新
        </Button>
        <Button type="error" @click="deleteData()" class="deleteButton">
            <Icon type="person-add" :size='16'></Icon>
            删除用户
        </Button>
        <Button type="info" @click="modal1 = true" class="newButton">
            <Icon type="person-add" :size='16'></Icon>
            新建用户
        </Button>
        <Modal v-model="modal1" ok-text="保存" class-name="vertical-center-modal" title="新建用户" @on-ok="ok('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position='left'>
                <FormItem label="用户名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请在此输入用户名"></Input>
                </FormItem>
                <FormItem label="Ip地址" prop="ip">
                    <Input v-model="formValidate.ip" placeholder="请在此输入ip地址"></Input>
                </FormItem>
                <FormItem label="密码有效期" prop="period">
                    <Input v-model="formValidate.period" placeholder="请在此输入密码有效期"></Input>
                </FormItem>
            </Form>
            <div>
                <Table height="232" border ref="selection" :columns="columnsClient" :data="dataClient" @on-selection-change="changeClient"></Table>
                <Button @click="handleSelectAll(true)" class="newBtn">全选</Button>
                <Button @click="handleSelectAll(false)" class="newBtn">取消全选</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import axios from 'axios'
import util from '../../libs/util.js'
import usermanager from './usermanager.vue'
export default {
  props: {
    deleteId: {
      type: Array
    }
  },
  data() {
    return {
      tableData1: [],
      modal1: false,
      selectedClients: [],
      formValidate: {
        name: '',
        ip: '',
        period: ''
      },
      ruleValidate: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        ip: [{ required: true, message: 'ip地址不能为空', trigger: 'blur' }],
        period: [
          { required: true, message: '密码有效期不能为空', trigger: 'blur' }
        ]
      },
      columnsClient: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '客户端名称',
          key: 'client'
        },
        {
          title: 'IP地址',
          key: 'ip'
        }
      ],
      dataClient: this.mockClient()
    }
  },
  methods: {
    sendData: function(obj) {
      var array = new Array()
      for (let i = 0; i < obj.data.length; i++) {
        array.push({
          client: obj.data[i].machine,
          ip: obj.data[i].ip,
          index: obj.data[i].id
        })
      }
      this.dataClient = array
    },
    deleteData: function() {
      let arr = {}
      arr.userlist = this.deleteId
      util.restfullCall('rest-ful/v3.0/user', arr, 'delete', this.recall)
    },
    recall: function(obj) {
      this.$emit('deletebtn', this.deleteId)
    },
    mockClient: function() {
      var array = new Array()
      util.restfullCall('rest-ful/v3.0/clients', null, 'get', this.sendData)
    },
    handleSelectAll: function(status) {
      this.$refs.selection.selectAll(status)
    },
    sendtoParent: function(obj) {
      this.$emit('input', {
        name: this.formValidate.name,
        ip: this.formValidate.ip,
        period: parseInt(this.formValidate.period),
        status: '正常'
      })
    },
    ok: function(name) {
      this.$refs[name].validate(valid => {
        let arr = []
        for (let i = 0; i < this.selectedClients.length; i++) {
          arr.push(this.selectedClients[i].index)
        }
        if (valid) {
          util.restfullCall(
            'rest-ful/v3.0/user',
            {
              name: this.formValidate.name,
              ip: this.formValidate.ip,
              pwdperiod: parseInt(this.formValidate.period),
              type: 4,
              clients: arr
            },
            'post',
            this.sendtoParent
          )
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    judge: function(number) {
      if (number == 0) {
        return '正常'
      }
      if (number == 1) {
        return '锁定'
      }
    },
    changeClient: function(selection) {
      this.selectedClients = selection
    },
    call: function(obj) {
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
      this.$emit('input', array)
    },
    refresh: function() {
      util.restfullCall('rest-ful/v3.0/syslogs', null, 'get', this.call)
    }
  }
}
</script>