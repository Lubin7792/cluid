<style>
	@import './basic.css';
</style>
<template>
<div>
	<Form :label-width="80" class="basic-form">
		<FormItem label="机器名称:">
            		<Input :placeholder="returnMessage.machine" disabled="true"></Input>
        		</FormItem>
		<FormItem label="操作系统类型:" class="special">
            		<Input :placeholder="returnMessage.os" disabled="true"></Input>
        		</FormItem>
        		<FormItem label="软件版本号:">
            		<Input :placeholder="returnMessage.version" disabled="true"></Input>
        		</FormItem>
        		<FormItem label="CPU:">
            		<Input :placeholder="returnMessage.cpu" disabled="true"></Input>
        		</FormItem>
        		<FormItem label="内存:">
            		<Input :placeholder="returnMessage.memory" disabled="true"></Input>
        		</FormItem>
        		<FormItem label="状态:">
            		<Input :placeholder="returnMessage.state" disabled="true"></Input>
        		</FormItem>
        	</Form>
	</div>
</template>
<script>

	export default{
		
		computed:{
			returnMessage(){
				return this.$store.state.returnMessage;
			},
		},
                    mounted:function(){
                        let url='rest-ful/v3.0/client/detail/';
                        this.$store.commit('getUrl',url);
                        this.$store.dispatch('getData',0);
                        // this.$store.commit('getUrl','rest-ful/v3.0/client/agent/instances?cid=');
                        // this.$store.dispatch('getData',1);
                    }
	}
</script>