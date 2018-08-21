<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
</style>
<template>
    <Modal v-model="modal" title="添加介质服务器设备" @on-ok="ok" @on-cancel="cancel" ok-text="保存" cancel-text="取消" class-name="vertical-center-modal">
        <Form :model="serverItem">
            <FormItem label="介质服务器地址">
                <Input v-model="serverItem.address" placeholder="请输入介质服务器地址..."></Input>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
export default {
  data() {
    return {
      serverItem: {
        address: ''
      }
    }
  },
  computed: {
    modal() {
      return this.$store.state.modal
    }
  },
  methods: {
    ok() {
      this.$store.commit('getModal', false)
    },
    cancel() {
      this.$store.commit('getModal', false)
    }
  }
}
</script>
