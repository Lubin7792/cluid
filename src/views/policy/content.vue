<template>
	<div>
		<div v-show="show==='基本信息'">
			<Form ref="basic" :model="basic" :label-width="80">
				<FormItem label="策略名称">
					<Input v-model="basic.name"></Input>
				</FormItem>
				<FormItem label="策略类型">
					<Input v-model="basic.type"></Input>
				</FormItem>
				<FormItem label="客户端">
					<Input v-model="basic.client"></Input>
				</FormItem>
				<FormItem label="状态">
					<Input v-model="basic.state"></Input>
				</FormItem>
			</Form>
		</div>
		<div v-show="show==='备份资源'">
			<Form ref="resources" :model="resources" :label-width="80">
				<FormItem label="介质池">
					<Input v-model="resources.pool"></Input>
				</FormItem>
				<FormItem label="备份设备">
					<Input v-model="resources.equipment"></Input>
				</FormItem>
			</Form>
		</div>
		<div v-show="show==='备份选项'">
			<Form ref="option" :model="option" :label-width="80">
				<FormItem label="备份内容">
					<Input v-model="option.content"></Input>
				</FormItem>
				<FormItem label="启用加密">
					<Input v-model="option.encryption"></Input>
				</FormItem>
				<FormItem label="启用压缩">
					<Input v-model="option.compress"></Input>
				</FormItem>
			</Form>
		</div>
		<div v-show="show==='调度计划'">
			<Form ref="plan" :model="plan" :label-width="80">
				<FormItem label="开始时间">
					<TimePicker format="HH:mm" placeholder="Select time" style="width: 112px"></TimePicker>
				</FormItem>
				<FormItem label="备份频率">
					<Select v-model="model1" style="width:200px">
						<Option v-for="item in frequency" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="备份级别">
					<Select v-model="model1" style="width:200px">
						<Option v-for="item in level" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="保留周期" style="height:140px">
					<Select v-model="model1" style="width:200px">
						<Option v-for="item in cycle" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
			</Form>
		</div>
		<Button type="warning">保存修改</Button>
		<Button type="warning">禁用</Button>
		<Button type="warning">启用</Button>
		<Button type="warning">立即调度</Button>
	</div>
</template>
<script>
export default {
  props: {
    show: {
      type: String
    }
  },
  data() {
    return {
      basic: {
        name: '',
        type: '',
        client: '',
        state: ''
      },
      resources: {
        pool: '',
        equipment: ''
      },
      option: {
        content: '',
        encryption: '',
        compress: ''
      },
      frequency: [
        {
          value: '天',
          label: '天'
        },
        {
          value: '周',
          label: '周'
        },
        {
          value: '月',
          label: '月'
        },
        {
          value: '季度',
          label: '季度'
        },
        {
          value: '年',
          label: '年'
        }
      ],
      level: [
        {
          value: '全量',
          label: '全量'
        },
        {
          value: '增量',
          label: '增量'
        },
        {
          value: '差量',
          label: '差量'
        }
      ],
      cycle: [
        {
          value: '天',
          label: '天'
        },
        {
          value: '周',
          label: '周'
        },
        {
          value: '月',
          label: '月'
        },
        {
          value: '季度',
          label: '季度'
        },
        {
          value: '年',
          label: '年'
        }
      ]
    }
  }
}
</script>