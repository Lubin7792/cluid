<style scoped>
    @import './newuser.css';
</style>
<template>
    <Modal v-model="modal" @on-ok="ok" @on-cancel="cancel" ok-text="保存" class-name="vertical-center-modal" title="修改用户" :updateId="updateId">
        <Form ref="formdata" :model="formdata" :rules="ruleValidate" :label-width="80" label-position='left'>
        <FormItem label="用户名" prop="name">
            <Input v-model="formdata.name" placeholder="请在此输入用户名" disabled="true"></Input>
        </FormItem>
        <FormItem label="Ip地址" prop="ip">
            <Input v-model="formdata.ip" placeholder="请在此输入ip地址"></Input>
        </FormItem>
         <FormItem label="密码有效期" prop="period">
            <Input v-model="formdata.period" placeholder="请在此输入密码有效期"></Input>
        </FormItem>
        </Form>
        <div>
        <Table height="232" border ref="selection" :columns="columnsClient" :data="dataClient" @on-selection-change="changeClient" ></Table>
        <Button @click="handleSelectAll(true)" class="newBtn">全选</Button>
        <Button @click="handleSelectAll(false)" class="newBtn">取消全选</Button>
    </div>
    </Modal>
</template>
<script>
import axios from 'axios';
import util from '../../libs/util.js'; 
    export default {
        name:'Update',
        props:{
            modal:{
                type:Boolean,
                default:false
            },
            updateId:{
                type:Number
            }
        },
        mounted:function(){
            util.restfullCall('rest-ful/v3.0/users',null,'get',this.callUsers);
        },
        updated:function(){
            for(let j=0;j<this.form.length;j++){
                if(this.form[j].id==this.updateId){
                    this.formdata=this.form[j];
                }
            }
            if(this.updateId!=''){
                let url="rest-ful/v3.0/userclient/"+this.updateId;
                util.restfullCall(url,null,'get',this.aquiescent);
            }
        },
        data(){
            return{
                formdata: {
                    name: '',
                    ip: '',
                    period:''
                },
                aquiescentClients:[],
                form:[],
                ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    ip: [
                        { required: true, message: 'ip地址不能为空', trigger: 'blur' },
                    ],
                    period: [
                        { required: true, message: '密码有效期不能为空', trigger: 'blur' },
                    ]
                },
                columnsClient: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '客户端名称',
                        key: 'client'
                    },
                    {
                        title: 'IP地址',
                        key: 'ip'
                    }
                ],
                dataClient:this.mockClient(),
            }
        },
        methods: {
            ok () {
                this.modal=false;
                this.$emit('change',this.modal);
                let string='rest-ful/v3.0/user/:'+this.updateId;
                let array={};
                let arr=[];
                if(this.selectedClients!=null){
                     for(let i=0;i<this.selectedClients.length;i++){
                        arr.push(this.selectedClients[i].index);
                     }
                }
                else{
                    arr=this.aquiescentClients;
                }

                array.ip=this.formdata.ip;
                array.pwdperiod=parseInt(this.formdata.period);
                array.clients=arr;
                array.id=this.updateId;

                util.restfullCall(string,array,'put',this.render);
            },
            render:function(obj){
                this.$emit('changeUser',this.formdata);
            },
            cancel () {
                this.modal=false;
                this.$emit('change',this.modal);
            },
            changeClient:function(selection){
               this.selectedClients=selection;
            },
            mockClient:function(){
                var array=new Array();
                util.restfullCall('rest-ful/v3.0/clients',null,'get',this.sendData);
            },
            aquiescent:function(obj){
                if(obj.data!=null&&obj.data!='undefined'){
                    for(let k=0;k<obj.data.length;k++){
                    for(let n=0;n<this.dataClient.length;n++){
                        if(obj.data[k]==this.dataClient[n].index){
                            this.dataClient[n]._checked=true;
                            this.aquiescentClients.push(this.dataClient[n].index);
                        }
                    }
                }
                }
                
            },
            callUsers:function(obj){
                var array=new Array();
                for(let i=0;i<obj.data.length;i++){
                        array.push({
                            name:obj.data[i].name,
                            ip:obj.data[i].ip,
                            period:obj.data[i].pwdperiod,
                            id:obj.data[i].id
                        })
                }
                this.form=array;
            },
            sendData:function(obj){
                var array=new Array();
                for(let i=0;i<obj.data.length;i++){
                    array.push({
                        client:obj.data[i].machine,
                        ip:obj.data[i].ip,
                        index:obj.data[i].id,
                        _checked:false
                    })
                }
                this.dataClient=array;
            }
        }
    }
</script>