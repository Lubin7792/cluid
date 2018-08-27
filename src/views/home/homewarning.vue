<template>
    <div class="home-war">
        <p class="war-tit">警告记录（最近一周）</p>
        <Table border :columns="columns7" :data="data6" :show-header="false"></Table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        width:'46px',
                                        height:'28px',
                                        borderColor:'#de7149'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        address: 'Sydney No. 1 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>