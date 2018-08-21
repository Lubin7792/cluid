
<template>
	<Modal v-model="modal" title="新建策略" @on-ok="ok" @on-cancel="cancel" class-name="vertical-center-modal">

	</Modal>
</template>
<script>
export default {
  props: {
    modal: {
      type: Boolean
    }
  },
  methods: {
    ok: function() {
      this.$emit('closePolicy', false)
    },
    cancel: function() {
      this.$emit('closePolicy', false)
    }
  }
}
</script>