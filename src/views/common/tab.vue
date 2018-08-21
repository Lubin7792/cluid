<template>
	<Tabs :animated="false" @on-click="recallName" on-tab-remove="close" value="tabName" v-model="tabName">
		<TabPane :label="list.title" v-for="list in clientList" :name="list.name">
			<Content></Content>
		</TabPane>
	</Tabs>
</template>
<script>
import Content from './content.vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  components: {
    Content
  },
  props: {
    tabName: {
      type: String
    }
  },
  // mounted:function(){
  // 	this.$store.commit('getTab','basic');
  // },
  updated: function() {
    // console.log(this.tabName);
  },
  data() {
    return {
      tabName: ''
    }
  },
  updated: function() {
    // console.log('aaaaaa');
    // this.tabName='basic';
  },
  computed: {
    // ...mapGetters(['clientId','clientList'])
    clientList() {
      return this.$store.state.clientList
    },
    clientId() {
      return this.$store.state.clientId
    },
    oracle() {
      return this.$store.state.oracle
    },
    tabName() {
      return this.$store.state.tabName
    }
  },
  methods: {
    recallName: function(name) {
      this.$store.commit('clientTitle', name)
      if (name == 'ORACLE数据库') {
        let search = 'client/agent/instances?cid=' + this.clientId + '&type=1'
        this.$store.commit('getSearch', search)
        this.$store.commit('getColumns', [
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
        ])
      }
    },
    close: function() {
      // console.log('关闭啦');
    }
  }
}
</script>

