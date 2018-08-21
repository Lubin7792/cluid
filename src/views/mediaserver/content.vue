<style>
.btn {
  margin-top: 15px;
}
</style>
<template>
	<div>
		<Table :columns="columns" :data="data1"></Table>
		<div v-show="show==='介质服务器'" class="btn">
			<Button type="info" @click="newServer">新建介质服务器</Button>
			<Button type="info">删除介质服务器</Button>
			<Button type="info" @click="updateServer">修改介质服务器</Button>
			<serverModal></serverModal>
		</div>
		<div v-show="show==='磁盘'" class="btn">
			<Button type="info" @click="newDisk">新建磁盘</Button>
			<Button type="info">删除磁盘</Button>
			<Button type="info" @click="updateDisk">修改磁盘</Button>
			<diskModal></diskModal>
			<updateDisk :modal="modalDisk" @close="closeDisk"></updateDisk>
		</div>
		<div v-show="show==='磁带库'" class="btn">
			<Button type="info" @click="newLibrary">新建磁带库</Button>
			<Button type="info">删除磁带库</Button>
			<Button type="info" @click="updateLibrary">修改磁带库</Button>
			<libraryModal></libraryModal>
			<updateLibrary :modal="modalLibrary" @close="closeLibrary"></updateLibrary>
		</div>
	</div>
</template>
<script>
import serverModal from './serverModal.vue'
import diskModal from './diskModal.vue'
import libraryModal from './libraryModal.vue'
import updateDisk from './updateDisk.vue'
import updateLibrary from './updateLibrary.vue'
export default {
  props: {
    columns: {
      type: Array
    },
    show: {
      type: String
    }
  },
  components: {
    serverModal,
    diskModal,
    libraryModal,
    updateDisk,
    updateLibrary
  },
  data() {
    return {
      data1: [],
      modalDisk: false,
      modalLibrary: false
    }
  },
  methods: {
    newServer: function() {
      this.$store.commit('getModal', true)
    },
    newDisk: function() {
      this.$store.commit('getModalDisk', true)
    },
    newLibrary: function() {
      this.$store.commit('getModalLibrary', true)
    },
    updateDisk: function() {
      this.modalDisk = true
      console.log(this.modalDisk)
    },
    closeDisk: function(modal) {
      this.modalDisk = modal
    },
    updateLibrary: function() {
      this.modalLibrary = true
    },
    closeLibrary: function(modal) {
      this.modalLibrary = modal
    }
  }
}
</script>