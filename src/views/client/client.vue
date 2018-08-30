<template>
	<Table class="lubin1" :columns="columns" :data="data" search="rest-ful/v3.0/clients" @searchFromTable="getData" @on-row-click='getId'></Table>
</template>
<script>
import Table from "../common/table.vue";
import $ from "jquery";
export default {
  components: {
    Table
  },
  computed: {
    clientId() {
      return this.$store.state.clientId;
    }
  },
  data() {
    return {
      version: [],
      state: [],
      clientId: "",
      updateModal: "false",
      columns: [
        {
          title: "机器名",
          key: "machine"
        },
        {
          title: "操作系统类型",
          key: "systemType"
        },
        {
          title: "IP地址",
          key: "ip"
        },
        {
          title: "软件版本号",
          key: "softwareVersion"
        },
        {
          title: "状态",
          key: "state"
        },
        {
          title: "操作",
          key: "operation",
          render: (h, params) => {
            return h("Icon", {
              props: {
                type: "gear-b",
                size: 20
              },
              nativeOn: {
                click: () => {
                  this.$store.commit("getTitle", "客户端配置");
                  this.updateModal = true;
                  this.$store.commit("updateTrue", true);
                  //获得标签页title
                  this.$store.dispatch("getTabsTitle", 1);
                  this.$store.commit("getTab", "basic");
                }
              }
            });
          }
        }
      ],
      data: []
    };
  },

  methods: {
    getData: function(obj) {
      for (let i = 0; i < obj.length; i++) {
        this.filter(obj[i].version, obj[i].state);
        this.data.push({
          machine: obj[i].machine,
          systemType: obj[i].os,
          ip: obj[i].ip,
          softwareVersion: this.version[i],
          state: this.state[i],
          id: obj[i].id
        });
      }
    },
    filter: function(versions, state) {
      let v1 = (versions & 0xff0000) >> 16;
      v1 = v1.toString();
      let v2 = (versions & 0xff00) >> 8;
      v2 = v2.toString();
      let v3 = versions & 0xff;
      v3 = v3.toString();
      let str = v1 + "." + v2 + "." + v3;
      if (state == 0) {
        this.state.push("离线");
      }
      if (state == 1) {
        this.state.push("在线");
      }
      this.version.push(str);
    }
  }
};
</script>