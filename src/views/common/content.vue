<template>
<div :show="show">
	<div v-if="show==='basic'">
		<Basic></Basic>
	</div>
	<div v-if="show==='ORACLE数据库'">
		<Oracle></Oracle>
	</div>
	<div v-if="show==='MYSQL数据库'">
		<Mysql></Mysql>
	</div>
	<div v-if="show==='SQLSERVER数据库'">
		<Sqlserver></Sqlserver>
	</div>
	<div v-if="show==='VMWARE虚拟机'">
		<Vmware></Vmware>
	</div>
</div>

</template>
<script>
import Basic from './basic.vue';
import Oracle from './oracle.vue';
import Mysql from './mysql.vue';
import Sqlserver from './sqlserver.vue';
import Vmware from './vmware.vue';
	export default{
		components:{
			Basic,
			Oracle,
			Mysql,
			Sqlserver,
			Vmware
		},
		computed:{
			show(){
				return this.$store.state.clientTitle;
			}
		},
		mounted:function(){
			// console.log(this.show);
		}
	}
</script>