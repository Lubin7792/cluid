<script>
	export default{
		data(){
			return{
				addData:{}
			}
		},
		methods:{
			sendToParent:function(name){
				this.$emit(name,this.addData);
			}
		}
	}
</script>