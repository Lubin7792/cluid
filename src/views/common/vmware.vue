<style>
@import './vmware.css';
</style>
<template>
	<Form class="vmware" :model="vmware">
		<Row>
			<Col span="12">
			<FormItem label="服务地址:">
				<Input v-model="vmware.server"></Input>
			</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
			<FormItem label="密码:">
				<Input v-model="vmware.password" class="vmware-password"></Input>
			</FormItem>
			</Col>
			<Col span="12">
			<FormItem label="用户名:">
				<Input v-model="vmware.user" class="user-input"></Input>
			</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="24">
			<FormItem label="ssl认证:">
				<Input v-model="vmware.ssl" class="vmware-ssl"></Input>
			</FormItem>
			</Col>
		</Row>
		<Row class="vmware-btn">
			<Button type="info" @click="updateVmware">保存修改</Button>
			<Button type="info" @click="newvmware">添加实例</Button>
			<Button type="info" @click="test">测试连接</Button>
			<Button type="info" @click="modalDelete = true">删除</Button>
			<Modal v-model="modalDelete" @on-ok="ok" @on-cancel="cancel" ok-text="确认删除" cancel-text="取消" class-name="vertical-center-modal">
				<p style="color:#f60;text-align:center;font-size:19px;">确认是否删除该实例，如果确认删除请点击删除，否认点击取消。</p>
			</Modal>
		</Row>
		<Row class="vmware-table">
			<Table :columns="columns" :data="data" @on-row-click="click" class="vmwareInstance"></Table>
		</Row>
	</Form>
</template>
<script>
import util from '../../libs/util.js'
export default {
  data() {
    return {
      vmware: {
        server: '',
        user: '',
        password: '',
        ssl: ''
      },
      data: [],
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
          title: 'ssl认证',
          key: 'ssl'
        }
      ],
      modalDelete: false
    }
  },
  computed: {
    clientList() {
      return this.$store.state.clientList
    },
    clientId() {
      return this.$store.state.clientId
    }
  },
  mounted: function() {
    let url =
      'rest-ful/v3.0/client/agent/instances?cid=' +
      this.clientId +
      '&type=' +
      this.clientList[4].key
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
    ok: function() {
      let url = 'rest-ful/v3.0/client/agent/instance/' + this.vmware.id
      let message = {}
      message.server = this.vmware.server
      message.user = this.vmware.user
      message.password = this.vmware.password
      message.ssl = this.vmware.ssl
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.conf = conf
      postData.id = this.vmware.id
      util.restfullCall(url, postData, 'delete', obj => {
        if (obj.data.code == 0) {
          this.data.forEach((item, index) => {
            if (item.id == this.vmware.id) {
              this.data.splice(index, 1)
            }
          })
          this.vmware = []
        }
      })
    },
    cancel: function() {
      this.vmware = []
    },
    newvmware: function() {
      let message = this.vmware
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.type = this.clientList[4].key
      postData.conf = conf
      util.restfullCall(
        'rest-ful/v3.0/client/agent/instance',
        postData,
        'post',
        obj => {
          if (obj.data.code == 0) {
            this.data.push({
              server: this.vmware.server,
              user: this.vmware.user,
              password: this.vmware.password,
              ssl: this.vmware.ssl,
              id: obj.data.id
            })
            this.vmware = []
          }
        }
      )
    },
    updateVmware: function() {
      let url = 'rest-ful/v3.0/client/agent/instance/' + this.vmware.id
      this.$store.commit('getUrl', url)
      let message = this.vmware
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.conf = conf
      postData.id = this.vmware.id
      util.restfullCall(url, postData, 'put', obj => {
        // console.log(obj);
        // state.commit('getCode',obj.data.code);
        // state.commit('getInstanceId',obj.data.id);
        if (obj.data.code == 0) {
          this.data.map(x => {
            if (x.id == this.vmware.id) {
              x.server = message.server
              x.user = message.user
              x.password = message.password
              x.ssl = message.ssl
            }
          })
          this.vmware = []
        }
      })
    },
    click: function(item, index) {
      this.vmware = item
    },
    test: function() {
      let message = this.vmware
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.conf = conf
      postData.id = this.vmware.id
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
      this.vmware = []
    }
  }
}
</script>