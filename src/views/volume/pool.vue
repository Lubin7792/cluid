<style lang="less">
.fr {
    float: right;
}
.mr16{
    margin-right:16px; 
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
  .style {
    margin-left: 35px;
  }
  .protected,
  .cover {
    margin-left: 11px;
  }
}
</style>
<template>
    <Modal v-model="modal" title="新建介质池" @on-ok="ok" @on-cancel="cancel" class-name="vertical-center-modal" ok-text="保存">
        <Form :model="pool">
            <FormItem label="介质池名称">
                <Input v-model="pool.name" style="width:400px"></Input>
            </FormItem>
            <FormItem label="类型">
                <Select v-model="model6" style="width:400px " class="fr mr16">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai" disabled>London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="保留周期">
                <Input v-model="pool.protected" style="width:400px" class="protected"></Input>
            </FormItem>
            <FormItem label="覆盖周期">
                <Input v-model="pool.cover" style="width:400px" class="cover"></Input>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
import util from '../../libs/util.js'
export default {
  data() {
    return {
      modal: false,
      pool: {
        name: '',
        style: '',
        protected: '',
        cover: ''
      }
    }
  },
  props: {
    modal: {
      type: Boolean
    }
  },
  methods: {
    ok() {
      let url = 'rest-ful/v3.0/volpool'
      let postData = {
        name: this.pool.name,
        type: this.pool.style,
        cover: this.pool.cover,
        protected: this.pool.protected
      }
      console.log(postData)
      util.restfullCall(url, postData, 'post', obj => {
        console.log(obj)
      })
      this.modal = false
      this.$emit('close', false)
    },
    cancel() {
      this.modal = false
      this.$emit('close', false)
    }
  }
}
</script>