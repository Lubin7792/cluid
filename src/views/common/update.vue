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
    <div>
        <Modal v-model="updateModal" class-name="vertical-center-modal" :title="title" @on-ok="ok" @on-cancel="cancel" id="modal">
            <Tab v-model="tabName" value="tabName"></Tab>
        </Modal>
    </div>
</template>
<script>
import Tab from './tab.vue'
export default {
  components: {
    Tab
  },
  data() {
    return {
      tabName: 'basic'
    }
  },
  updated: function() {
    this.tabName = 'basic'
  },
  computed: {
    updateModal() {
      return this.$store.state.updateModal
    },
    title() {
      return this.$store.state.title
    }
  },
  methods: {
    ok() {
      //this.updateModal=false;
      this.$store.commit('updateFalse', false)
      this.tabName = 'basic'
    },
    cancel() {
      //this.updateModal=false;
      this.$store.commit('updateFalse', false)
      this.tabName = 'basic'
    }
  }
}
</script>
