<template>
    <div class="home-war">
        <p class="war-tit">警告记录（最近一周）</p>
        <Table  :columns="columns7" :data="data6" :show-header="false" @on-row-click="getRowData"></Table>
        <Modal  v-model="modal12" title="日志详情"  cancel-text class="lubin12">
               <popup :num="ceshi" ></popup>   
        </Modal>
    </div>
</template>

<script>
import popup from "../common/popup.vue";
export default {
  data() {
    return {
      modal12: false,
      ceshi:[],
      columns7: [
        {
          title: "Address",
          key: "address"
        },
        {
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    width: "46px",
                    height: "28px",
                    borderColor: "#de7149"
                  },
                  on: {
                    click: () => {
                      this.modal12 = true;
                    }
                  }
                },
                ""
              )
            ]);
          }
        }
      ],
      data6: [
        {
          address: "New York No. 1 Lake Park"
        },
        {
          address: "London No. 1 Lake Park"
        },
        {
          address: "Sydney No. 1 Lake Park"
        }
      ]
    };
  },
  methods: {
    remove(index) {
      this.data6.splice(index, 1);
    },
    getRowData(row, index) {
      console.log(row, index);
     this.ceshi=row;
      console.log(this.ceshi.address)
    }
  },
  components: {
    popup
  }
};
</script>