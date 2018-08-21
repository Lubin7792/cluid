<style>
@import './sqlserver.css';
</style>
<template>
    <Form class="sqlserver" :model="sqlserver">
        <Row>
            <Col span="12">
            <FormItem label="主机名:">
                <input v-model="sqlserver.server"></input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="用户名:">
                <input v-model="sqlserver.user" class="user-input"></input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
            <FormItem label="密码:">
                <input v-model="sqlserver.password" class="sqlserver-password"></input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="超时时间:">
                <input v-model="sqlserver.timeout"></input>
            </FormItem>
            </Col>
        </Row>
        <Row>
            <span>认证方式</span>
            <Select v-model="type" style="width:200px" class='selection' @on-change="changeOption">
                <Option v-for="item in authtype" :value="item.value" :key="item.value"></Option>
            </Select>
        </Row>
        <Row class="sqlserver-btn">
            <Button type="info" @click="updateSqlserver">保存修改</Button>
            <Button type="info" @click="newSqlserver">添加实例</Button>
            <Button type="info" @click="test">测试连接</Button>
            <Button type="info" @click="modalDelete = true">删除</Button>
            <Modal v-model="modalDelete" @on-ok="ok" @on-cancel="cancel" ok-text="确认删除" cancel-text="取消" class-name="vertical-center-modal">
                <p style="color:#f60;text-align:center;font-size:19px;">确认是否删除该实例，如果确认删除请点击删除，否认点击取消。</p>
            </Modal>
        </Row>
        <Row class="sqlserver-table">
            <Table :columns="columns" :data="data" @on-row-click="click" class="instanceTable"></Table>
        </Row>

    </Form>
</template>
<script>
import util from '../../libs/util.js'
export default {
  computed: {
    clientId() {
      return this.$store.state.clientId
    },
    instanceId() {
      return this.$store.state.instanceId
    },
    clientList() {
      return this.$store.state.clientList
    }
  },
  data() {
    return {
      sqlserver: {
        server: '',
        user: '',
        password: '',
        timeout: ''
      },
      modalDelete: false,
      columns: [
        {
          title: '服务地址',
          key: 'server'
        },
        {
          title: '用户名',
          key: 'user'
        },
        {
          title: '超时时间',
          key: 'timeout'
        },
        {
          title: '认证方式',
          key: 'authtype'
        }
      ],
      data: [],
      authtype: [
        {
          value: '操作系统认证',
          label: '0'
        },
        {
          value: 'SQLSERVER认证',
          label: '1'
        }
      ],
      type: '',
      instanceId: '',
      code: '',
      param: false
    }
  },
  mounted: function() {
    // console.log(this.clientList);
    let url =
      'rest-ful/v3.0/client/agent/instances?cid=' +
      this.clientId +
      '&type=' +
      this.clientList[3].key
    util.restfullCall(url, null, 'get', obj => {
      let data = []
      for (let i = 0; i < obj.data.length; i++) {
        let object = JSON.parse(obj.data[i].conf)
        object.id = obj.data[i].id
        data.push(object)
      }
      for (let i = 0; i < data.length; i++) {
        this.data.push(data[i])
      }
    })
  },
  methods: {
    //删除实例
    ok() {
      let url = 'rest-ful/v3.0/client/agent/instance/' + this.sqlserver.id
      let message = {}
      message.server = this.sqlserver.server
      message.user = this.sqlserver.user
      message.password = this.sqlserver.password
      message.timeout = this.sqlserver.timeout
      message.authtype = this.type
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.conf = conf
      postData.id = this.sqlserver.id
      util.restfullCall(url, postData, 'delete', obj => {
        // state.commit('getCode',obj.data.code);
        // state.commit('getInstanceId',obj.data.id);
        if (obj.data.code == 0) {
          this.data.forEach((item, index) => {
            if (item.id == this.sqlserver.id) {
              this.data.splice(index, 1)
            }
          })
          this.sqlserver = []
          this.type = ''
        }
      })
    },
    cancel() {
      this.sqlserver = []
      this.type = ''
    },
    click: function(item, index) {
      this.sqlserver.server = item.server
      this.sqlserver.user = item.user
      this.sqlserver.password = item.password
      this.sqlserver.timeout = item.timeout
      this.type = item.authtype
      this.sqlserver.id = item.id
    },
    updateSqlserver: function() {
      let url = 'rest-ful/v3.0/client/agent/instance/' + this.sqlserver.id
      let message = {}
      message.server = this.sqlserver.server
      message.user = this.sqlserver.user
      message.password = this.sqlserver.password
      message.timeout = this.sqlserver.timeout
      message.authtype = this.type
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.conf = conf
      postData.id = this.sqlserver.id
      util.restfullCall(url, postData, 'put', obj => {
        if (obj.data.code == 0) {
          this.data.map(x => {
            if (x.id == this.sqlserver.id) {
              x.server = message.server
              x.user = message.user
              x.password = message.password
              x.timeout = message.timeout
              x.authtype = message.authtype
            }
          })
          this.sqlserver = []
          this.type = ''
        }
      })
    },
    newSqlserver: function() {
      let message = {}
      message.server = this.sqlserver.server
      message.user = this.sqlserver.user
      message.password = this.sqlserver.password
      message.timeout = this.sqlserver.timeout
      message.authtype = this.type
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.type = this.clientList[3].key
      postData.conf = conf
      util.restfullCall(
        'rest-ful/v3.0/client/agent/instance',
        postData,
        'post',
        obj => {
          if (obj.data.code == 0) {
            this.data.push({
              server: this.sqlserver.server,
              user: this.sqlserver.user,
              password: this.sqlserver.password,
              timeout: this.sqlserver.timeout,
              authtype: this.type,
              id: obj.data.id
            })
            this.sqlserver = []
            this.type = ''
          }
        }
      )
    },
    test: function() {
      let message = {}
      message.server = this.sqlserver.server
      message.user = this.sqlserver.user
      message.password = this.sqlserver.password
      message.timeout = this.sqlserver.timeout
      message.authtype = this.type
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.conf = conf
      postData.id = this.sqlserver.id
      util.restfullCall(
        'rest-ful/v3.0/client/agent/instance/test',
        postData,
        'post',
        obj => {
          if (obj.data.code == 0) {
            alert('测试连接成功')
          }
          if (obj.data.code == 1) {
            alert('测试连接失败')
          }
        }
      )
      this.sqlserver = []
      this.type = ''
    }
  }
}
</script>