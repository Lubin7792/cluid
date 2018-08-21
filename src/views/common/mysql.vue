<style>
	@import './mysql.css';
</style>
<template>
	<Form class="mysql" :model="mysql">
	<Row>
        		<Col span="12">
        		<!-- <FormItem label="Input">
		            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
		        </FormItem> -->
        			<FormItem label="服务地址:">
        				<Input v-model="mysql.serverName"></Input>
	        		</FormItem>
        		</Col>
        		<Col span="12">
        			<FormItem label="用户名:">
	            		<Input v-model="mysql.userName"></Input>
	        		</FormItem>
        		</Col>
    	</Row>
    	<Row>
        		<Col span="12">
        			<FormItem label="密码:">
	            		<Input v-model="mysql.password" class="mysql-password"></Input>
	        		</FormItem>
        		</Col>
        		<Col span="12">
        			<FormItem label="端口号:">
	            		<Input v-model="mysql.port"></Input>
	        		</FormItem>
        		</Col>
    	</Row>
    	<Row>
    		<Col span="24">
        			<span style='height:33px;line-height: 33px'>Bin-Log</span>
        			<FormItem label="路径:">
	            		<Input v-model="mysql.path" class="mysql-path"></Input>
	        		</FormItem>
        		</Col>
    	</Row>
    	<Row class="mysql-btn">
		 <Button type="info" @click="updateInstance">保存修改</Button>
		 <Button type="info" @click="newInstance">添加实例</Button>
		 <Button type="info" @click="test">测试连接</Button>
		 <Button type="info" @click="modalDelete = true">删除</Button>
		 <Modal
        v-model="modalDelete"
        @on-ok="ok"
        @on-cancel="cancel" ok-text="确认删除"
        cancel-text="取消" class-name="vertical-center-modal">
        <p style="color:#f60;text-align:center;font-size:19px;">确认是否删除该实例，如果确认删除请点击删除，否认点击取消。</p>
    </Modal>
	 </Row>
	 <Row class="mysql-table">
	 	<Table :columns="columns" :data="data" @on-row-click="click" class="mysqlInstance"></Table>
	</Row>

	</Form>
</template>
<script>
	import util from '../../libs/util.js';
	export default{
		data(){
			return{
				mysql:{
					serverName:'',
					userName:'',
					password:'',
					port:'',
					path:''
				},
				columns:[{
					title:'服务地址',
					key:'serverName'
				},{
					title:'用户名',
					key:'userName'
				},{
					title:'端口号',
					key:'port'
				},{
					title:'Bin-Log路径',
					key:'path'
				}
				],
				data:[],
				modalDelete: false,
			}
		},
		mounted:function(){
			let url='rest-ful/v3.0/client/agent/instances?cid='+this.clientId+'&type='+this.clientList[2].key;
			let mysqlData=[];
			  util.restfullCall(url, null, 'get',(obj)=>{
                    for(let i=0;i<obj.data.length;i++){
                        let object=JSON.parse(obj.data[i].conf);
                       object.id=obj.data[i].id;
                        mysqlData.push(object);
                    }
                    for(let i=0;i<mysqlData.length;i++){
					this.data.push({
						'serverName':mysqlData[i].serverName,
			            'userName':mysqlData[i].user,
			            'password':mysqlData[i].password,
			            'port':mysqlData[i].port,
			            'path':mysqlData[i]["bin-log"],
			            'id':mysqlData[i].id
					});

			}
                });
		},
		computed:{
			clientId(){
				return this.$store.state.clientId;
			},
			instanceId(){
				return this.$store.state.instanceId;
			},
			clientList(){
				return this.$store.state.clientList;
			}
		},
		methods:{
			test:function(){
				let message=this.mysql;
				let conf=JSON.stringify(message);
				let postData={};
				postData.cid=this.clientId;
				postData.conf=conf;
				postData.id=this.mysql.id;
				 util.restfullCall('rest-ful/v3.0/client/agent/instance/test',postData,'post',(obj)=>{
	                  if(obj.data.code==0){
	                  	alert('测试连接成功');
	                  }
	                  if(obj.data.code==1){
	                  	 alert('测试连接失败');
	                  }
                })
			},
			//删除实例
			ok () {
                let url='rest-ful/v3.0/client/agent/instance/'+this.mysql.id;
                let instance={
					"serverName":this.mysql.serverName,
					"user":this.mysql.userName,
					"password":this.mysql.password,
					"port":this.mysql.port,
					"bin-log":this.mysql.path
				};
				let conf=JSON.stringify(instance);
				let postData={};
				postData.cid=this.clientId;
				postData.conf=conf;
				postData.id=this.mysql.id;
               util.restfullCall(url,postData,'delete',(obj)=>{
                     if(obj.data.id==0){
						this.data.forEach((item,index)=>{
							if(item.id==this.mysql.id){
								this.data.splice(index,1);
							}
						});
						this.mysql={};
	                }
	             if(this.code==1){
	             	alert('删除失败');
	             }
                })
            },
            cancel () {
                this.mysql={};
            },
			click:function(item,index){
				this.mysql=item;
			},
			updateInstance:function(){
				let url ='rest-ful/v3.0/client/agent/instance/'+this.mysql.id;	
				// console.log(this.mysql.id);			
				let instance={
					"serverName":this.mysql.serverName,
					"user":this.mysql.userName,
					"password":this.mysql.password,
					"port":this.mysql.port,
					"bin-log":this.mysql.path
				};
				let conf=JSON.stringify(instance);
				let postData={};
				postData.cid=this.clientId;
				postData.conf=conf;
				postData.id=this.mysql.id;
				util.restfullCall(url,postData,'put',(obj)=>{
             		if(obj.data.code==0){
						this.data.map(x=>{
							if(x.id==postData.id){
								x.serverName=instance.serverName;
								x.userName=instance.user;
								x.password=instance.password;
								x.port=instance.port;
								x.path=instance["bin-log"];
							}
						});
					}
                })
				this.mysql={};
			},
			newInstance:function(){
				let instance={
					"serverName":this.mysql.serverName,
					"user":this.mysql.userName,
					"password":this.mysql.password,
					"port":this.mysql.port,
					"bin-log":this.mysql.path
				};
				let conf=JSON.stringify(instance);
				let postData={};
				postData.cid=this.clientId;
				postData.type=this.clientList[2].key;
				postData.conf=conf;
				util.restfullCall('rest-ful/v3.0/client/agent/instance',postData,'post',(obj)=>{
					console.log(obj.data.id);
                  if(obj.data.code==0){
                     this.data.push({
                        'serverName':this.mysql.serverName,
			            'userName':this.mysql.userName,
			            'password':this.mysql.password,
			            'port':this.mysql.port,
			            'path':this.mysql.path,
                        'id':obj.data.id
                    });  
                     this.mysql={};
                  }
                })
			}
		}
	}
</script>