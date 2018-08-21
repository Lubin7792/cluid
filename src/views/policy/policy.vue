<template>
	<div>
		<Table border :columns="policyColumns" :data="data5"></Table>
		<Button type="error" style="margin-top:15px;" @click="newPolicy">新建策略</Button>
		<Button type="error" style="margin-top:15px;">删除策略</Button>
		<Button type="error" style="margin-top:15px;" @click="updatePolicy">修改策略</Button>
		<newPolicy :modal="newModal" @closePolicy="closePolicy"></newPolicy>
		<updatePolicy :modal="modal" @close="close"></updatePolicy>
	</div>
</template>
<script>
	import updatePolicy from './updatePolicy.vue';
	import newPolicy from './newPolicy.vue';
	export default{
		data(){
			return{
				policyColumns:[{
					title:'策略名称',
					key:'name',
					sortable: true
				},{
					title:'类型',
					key:'type',
					sortable: true
				},{
					title:'设备',
					key:'equipment',
					sortable: true
				},{
					title:'介质池',
					key:'pool',
					sortable: true
				},{
					title:'优先级',
					key:'priority',
					sortable: true
				},{
					title:'客户端',
					key:'client',
					sortable: true
				},{
					title:'状态',
					key:'state',
					sortable: true
				}],
				modal:false,
				newModal:false
			}
		},
		components:{
			updatePolicy,
			newPolicy
		},
		methods:{
			updatePolicy:function(){
				this.modal=true;
			},
			close:function(modal){
				this.modal=modal;
			},
			newPolicy:function(){
				this.newModal=true;
			},
			closePolicy:function(modal){
				this.newModal=modal;
			}
		}
	}
</script>