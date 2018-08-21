<template>
    <Modal
        v-model="modalGlance"
        title="浏览设备目录"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        },
         computed:{
            modalGlance(){
                return this.$store.state.modalGlance;
            },
         },
        methods: {
            ok () {
                this.$store.commit('getModalGlance',false);
            },
            cancel () {
                this.$store.commit('getModalGlance',false);
            }
        }
    }
</script>