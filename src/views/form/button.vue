<template>
<div>
	<Button type="primary" @click="equal" :modal='modal'>Primary</Button>
	<Form  @change="change" :modal='modal'></Form>
</div>
	
</template>
<script>
import Form from './form.vue';
	export default{
		components:{
			Form
		},
		data(){
			return{
				modal:false
			}
		},
		methods:{
			equal:function(){
				return this.change();
			},
			change:function(){
				this.modal=true;
			}
		}
	}
</script>