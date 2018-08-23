<style scoped>
@import './syscontent.css';

</style>
<template>
    <div class="sys-content">
        <div class="row">
            <Table highlight-row :data="tableData1" :columns="tableColumns1" :row-class-name="rowClassName" @on-row-click="onClick"></Table>
        </div>
        <div style="margin: 10px;overflow: hidden">
            <div style="position: fixed;
left: 50%;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
        <Modal v-model="modal1" title="日志详情" class="sysmodal" cancel-text>
            <div class="sysdetails">
                <ul>
                    <li>
                        <span>级别:</span>
                        <Input v-model="detailsData.level" readonly placeholder="Enter something..." style="width: 300px"></Input>
                    </li>
                    <li>
                        <span>时间:</span>
                        <Input v-model="detailsData.time" readonly placeholder="Enter something..." style="width: 300px"></Input>
                    </li>
                    <li>
                        <span>用户:</span>
                        <Input v-model="detailsData.id" readonly placeholder="Enter something..." style="width: 300px"></Input>
                    </li>
                    <li>
                        <span>来源:</span>
                        <Input v-model="detailsData.src" readonly placeholder="Enter something..." style="width: 300px"></Input>
                    </li>
                    <li>
                        <span>描述:</span>
                        <Input v-model="detailsData.desc" type="textarea" :autosize="{minRows: 5,maxRows: 6}" placeholder="Enter something..." style="width: 300px"></Input>
                    </li>
                </ul>
            </div>
        </Modal>

    </div>
</template>
<script>
import util from '../../libs/util.js'
import axios from 'axios'
export default {
  data () {
            return {
                modal1: false,
                detailsData: {},
                tableData1: this.logfile(),
                tableColumns1: [
                    {
                        title: '级别',
                        key: 'level',
                        render: (h, params) => {
                            const row = params.row;
                            const text = row.level === 1 ? '消息' : row.level === 2 ? '警告' : '错误';

                            return h('p', {
                                props: {
                                    type: 'p',
                                }
                            }, text);
                        }
                    },
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '用户',
                        key: 'id'
                    },
                    {
                        title: '来源',
                        key: 'src'
                    },
                    {
                        title: '描述',
                        key: 'desc',
                        className: 'sysdesc',
                        width:400
                    }
                ],
                details1:{}
            }
        },
        methods: {
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                // this.tableData1 = this.mockTableData1();
            },
            logfile () {
                util.restfullCall('rest-ful/v3.0/syslogs',null,'get',this.senddata)
            },
            senddata: function(obj) {
                var array = new Array()
                for (let i = 0; i < obj.data.length; i++) {
                    array.push({
                    desc: obj.data[i].desc,
                    id: obj.data[i].id,
                    level: obj.data[i].level,
                    src: obj.data[i].src,
                    time: obj.data[i].time
                    })
                }
                this.tableData1 = array;
            },
            rowClassName (row, index) {
                if(row.level ==1 ) {
                    return 'sys-one';
                }else if(row.level == 2) {
                    return 'sys-two';
                }else if (row.level == 3) {
                    return 'sys-three'
                }
            return '';
            },
            onClick (row, index) {
                console.log(row,index);
                this.modal1 = true;
                this.detailsData = row
                this.detailsData.level = row.level === 1 ? '消息闪烁' : row.level === 2 ? '警告' : '错误';
            }
            
        },
        components: {
        }
}
</script>
