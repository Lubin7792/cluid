<template>
    <div>
        <Modal v-model="modal" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>
</template>
<script>
import Button from './button.vue'
export default {
  props: {
    modal: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Button
  },
  methods: {
    ok() {
      this.$Message.info('Clicked ok')
    },
    cancel() {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>
