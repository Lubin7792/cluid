<style >
@import "./popup.css";
</style>
<template>

    <div class="sysdetails">
        <ul>
            <li>
                <span>级别:</span>
                <Input v-model="num.address"  readonly placeholder="Enter something..." style="width: 300px"></Input>
            </li>
            <li>
                <span>时间:</span>
                <Input  readonly placeholder="Enter something..." style="width: 300px"></Input>
            </li>
            <li>
                <span>用户:</span>
                <Input  readonly placeholder="Enter something..." style="width: 300px"></Input>
            </li>
            <li>
                <span>来源:</span>
                <Input  readonly placeholder="Enter something..." style="width: 300px"></Input>
            </li>
            <li>
                <span>描述:</span>
                <Input type="textarea" :autosize="{minRows: 5,maxRows: 6}" placeholder="Enter something..." style="width: 300px"></Input>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Object
    }
  }
};
</script>