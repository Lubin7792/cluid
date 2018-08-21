<style scoped>
@import './oracle.css';
</style>
<template>
	<Form class="oracle">
		<Row>
			<Col span="12">
			<FormItem label="实例名:">
				<input v-model="formItem.instanceName"></input>
			</FormItem>
			</Col>
			<Col span="12">
			<FormItem label="用户名:">
				<input v-model="formItem.userName" class="user-input"></input>
			</FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="12">
			<FormItem label="密码:">
				<input v-model="formItem.password" class="password-input"></input>
			</FormItem>
			</Col>
			<Col span="12">
			<FormItem label="超时时间:">
				<input v-model="formItem.time"></input>
			</FormItem>
			</Col>
		</Row>
		<Row>
			<span>CATLOG实例</span>
			<Select v-model="model1" style="width:200px" class='catalog-selection' @on-change="changeOption">
				<Option v-for="item in catalogList" :value="item.value" :key="item.value"></Option>
			</Select>
		</Row>
		<Row class="row-btn">
			<Button type="info" @click="updateInstance">保存修改</Button>
			<Button type="info" @click="newInstance">添加实例</Button>
			<Button type="info" @click="test">测试连接</Button>
			<Button type="info" @click="modalDelete = true">删除</Button>
			<Modal v-model="modalDelete" @on-ok="ok" @on-cancel="cancel" ok-text="确认删除" cancel-text="取消" class-name="vertical-center-modal">
				<p style="color:#f60;text-align:center;font-size:19px;">确认是否删除该实例，如果确认删除请点击删除，否认点击取消。</p>
			</Modal>
		</Row>
		<Row class="row-table">
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
  mounted: function() {
    let url =
      'rest-ful/v3.0/client/agent/instances?cid=' +
      this.clientId +
      '&type=' +
      this.clientList[1].key
    util.restfullCall(url, null, 'get', obj => {
      let data = []
      for (let i = 0; i < obj.data.length; i++) {
        let object = JSON.parse(obj.data[i].conf)
        object.id = obj.data[i].id
        this.oracle.push(object)
      }
      for (let i = 0; i < this.oracle.length; i++) {
        this.data.push({
          instanceName: this.oracle[i].name,
          userName: this.oracle[i].user,
          catalog: this.oracle[i].catalog,
          time: this.oracle[i].timeout,
          password: this.oracle[i].password,
          id: this.oracle[i].id
        })
        this.catalogList.push({
          value: this.oracle[i].name,
          label: this.oracle[i].name
        })
      }
    })
  },
  data() {
    return {
      oracle: [],
      modalDelete: false,
      formItem: {
        instanceName: '',
        userName: '',
        password: '',
        time: ''
      },
      columns: [
        {
          title: '实例名称',
          key: 'instanceName'
        },
        {
          title: '用户',
          key: 'userName'
        },
        {
          title: 'CATALOG实例',
          key: 'catalog'
        },
        {
          title: '超时时间',
          key: 'time'
        }
      ],
      data: [],
      catalogList: [],
      model1: '',
      catalog: ''
    }
  },
  methods: {
    //删除实例
    ok() {
      let url = 'rest-ful/v3.0/client/agent/instance/' + this.formItem.id
      let message = {}
      message.name = this.formItem.instanceName
      message.user = this.formItem.userName
      message.password = this.formItem.password
      message.timeout = this.formItem.time
      message.catalog = this.catalog
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.type = this.clientList[1].key
      postData.conf = conf
      util.restfullCall(url, postData, 'delete', obj => {
        if (obj.data.code == 0) {
          this.data.forEach((item, index) => {
            if (item.id == this.formItem.id) {
              this.data.splice(index, 1)
              this.catalogList.forEach((catalog, i) => {
                if (catalog.value == this.formItem.instanceName) {
                  this.catalogList.splice(i, 1)
                }
              })
            }
          })
          this.formItem = []
          this.model1 = ''
        }
      })
    },
    cancel() {
      this.formItem = []
      this.model1 = ''
    },
    //新建实例
    newInstance: function() {
      let message = {}
      message.name = this.formItem.instanceName
      message.user = this.formItem.userName
      message.password = this.formItem.password
      message.timeout = this.formItem.time
      message.catalog = this.catalog
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.type = this.clientList[1].key
      postData.conf = conf
      util.restfullCall(
        'rest-ful/v3.0/client/agent/instance',
        postData,
        'post',
        obj => {
          if (obj.data.code == 0) {
            this.data.push({
              instanceName: this.formItem.instanceName,
              userName: this.formItem.userName,
              catalog: this.catalog,
              time: this.formItem.time,
              password: this.formItem.password,
              id: obj.data.id
            })
            this.catalogList.push({
              value: this.formItem.instanceName,
              label: this.formItem.instanceName
            })
            this.formItem = []
            this.model1 = ''
          }
        }
      )
    },
    changeOption: function(value) {
      this.catalog = value
    },
    //
    click: function(item, index) {
      this.formItem.instanceName = item.instanceName
      this.formItem.userName = item.userName
      // this.formItem.catalog=item.catalog;
      this.formItem.time = item.time
      this.formItem.password = item.password
      this.formItem.id = item.id
      this.model1 = item.catalog
    },
    //修改实例
    updateInstance: function() {
      let url = 'rest-ful/v3.0/client/agent/instance/' + this.formItem.id
      let message = {}
      message.name = this.formItem.instanceName
      message.user = this.formItem.userName
      message.password = this.formItem.password
      message.timeout = this.formItem.time
      message.catalog = this.catalog
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.conf = conf
      postData.id = this.formItem.id
      util.restfullCall(url, postData, 'put', obj => {
        if (obj.data.code == 0) {
          this.data.map(x => {
            if (x.id == this.formItem.id) {
              x.instanceName = this.formItem.instanceName
              x.userName = this.formItem.userName
              x.catalog = this.model1
              x.time = this.formItem.time
              x.password = this.formItem.password
            }
          })
          this.formItem = []
          this.model1 = ''
        }
      })
    },
    test: function() {
      let message = {}
      message.name = this.formItem.instanceName
      message.user = this.formItem.userName
      message.password = this.formItem.password
      message.timeout = this.formItem.time
      message.catalog = this.catalog
      let conf = JSON.stringify(message)
      let postData = {}
      postData.cid = this.clientId
      postData.conf = conf
      postData.id = this.formItem.id
      util.restfullCall(
        'rest-ful/v3.0/client/agent/instance/test',
        postData,
        'post',
        obj => {
          if (obj.data.code == 0) {
            alert('测试连接成功')
            this.formItem = []
            this.model1 = ''
          }
          if (obj.data.code == 1) {
            alert('测试连接失败')
            this.formItem = []
            this.model1 = ''
          }
        }
      )
    }
  }
}
</script>