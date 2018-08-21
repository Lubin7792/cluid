<style>
@import './libraryModal.css';
</style>
<template>
	<Modal title="修改磁带库" v-model="modal" class-name="vertical-center-modal" @on-ok="ok" @on-cancel="cancel" ok-text="保存" cancel-text="取消">
		<Form :model="libraryItem">
			<FormItem label="设备名称">
				<Input v-model="libraryItem.name" placeholder="请输入设备名称..." style="width: 415px"></Input>
			</FormItem>
			<FormItem>
				<span>介质服务器</span>
				<Dropdown style="margin-left: 20px">
					<Button type="primary">
						下拉菜单
						<Icon type="ios-arrow-down"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem>驴打滚</DropdownItem>
						<DropdownItem>炸酱面</DropdownItem>
						<DropdownItem disabled>豆汁儿</DropdownItem>
						<DropdownItem>冰糖葫芦</DropdownItem>
						<DropdownItem divided>北京烤鸭</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</FormItem>
			<FormItem>
				<span>机械肩</span>
				<Dropdown style="margin-left: 20px">
					<Button type="primary">
						下拉菜单
						<Icon type="ios-arrow-down"></Icon>
					</Button>
					<DropdownMenu slot="list">
						<DropdownItem>驴打滚</DropdownItem>
						<DropdownItem>炸酱面</DropdownItem>
						<DropdownItem disabled>豆汁儿</DropdownItem>
						<DropdownItem>冰糖葫芦</DropdownItem>
						<DropdownItem divided>北京烤鸭</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</FormItem>
			<Table :columns="libraryColumns" :data="libraryData"></Table>
			<FormItem>
				<Checkbox v-model="single" class="checkbox">是否允许任务并行</Checkbox>
				<FormItem label="最大并行任务数量" v-if="single===true" class="maxTask">
					<Input v-model="libraryItem.max" style="width: 150px"></Input>
				</FormItem>
			</FormItem>
		</Form>
	</Modal>
</template>
<script>
export default {
  data() {
    return {
      libraryItem: {
        name: '',
        max: ''
      },
      libraryColumns: [
        {
          title: '序列号',
          key: 'id'
        },
        {
          title: '厂商',
          key: 'Manufacturer'
        },
        {
          title: '驱动器数量',
          key: 'driver'
        },
        {
          title: '槽位数量',
          key: 'slot'
        }
      ],
      single: false
    }
  },
  props: {
    modal: {
      type: Boolean
    }
  },
  methods: {
    ok() {
      this.$emit('close', false)
    },
    cancel() {
      this.$emit('close', false)
    }
  }
}
</script>