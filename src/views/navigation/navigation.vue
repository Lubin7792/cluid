<style>
@import './navigation.css';
/*@import './iconfont.css';*/
</style>
<template>
    <div class="layout">
        <Layout>
            <Header class="navigation-header" style="height:50px; background:none;">
                <Menu mode="horizontal" active-name="1" class="header" stylt="height:50px !important">
                    <div class="layout-logo">
                    </div>
                    <span class="title">THE VRTS备份软件</span>
                    <div class="layout-nav">
                        <MenuItem name="1">
                        <Icon type="help-circled"></Icon>
                        帮助
                        </MenuItem>
                        <MenuItem name="2">
                        <Icon type="android-person"></Icon>
                        admin
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{height:'100%'}">
                <Content :style="{background: '#fff',height:'100%'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="1-2" :style="{background:'#4a4949',height:'100%'}" width="282px" :open-names="['1']" @on-select="changeUrl">
                                <MenuItem name="home" font-size="16px">
                                <!--  <Icon type="ios-home"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-home"></use>
                                </svg>
                                首页
                                </MenuItem>
                                <MenuItem name="usermanager" font-size="16px">
                                <!-- <Icon type="person-add"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-user-circle"></use>
                                </svg>
                                用户管理
                                </MenuItem>
                                <MenuItem name="taskmonitor">
                                <!--  <Icon type="monitor"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-dashboard"></use>
                                </svg>
                                <!-- <i class="iconfont">&#xe602;</i> -->
                                任务监控
                                </MenuItem>
                                <MenuItem name="client">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-laptop"></use>
                                </svg>
                                客户端
                                </MenuItem>
                                <MenuItem name="servicemanager">
                                <!-- <Icon type="gear-a"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-wrench"></use>
                                </svg>
                                服务管理
                                </MenuItem>
                                <MenuItem name="syslog">
                                <!-- <Icon type="clipboard"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-file"></use>
                                </svg>
                                日志管理
                                </MenuItem>
                                <MenuItem name="mediaserver">
                                <!-- <Icon type="social-windows"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-server"></use>
                                </svg>
                                介质服务器
                                </MenuItem>
                                <MenuItem name="volume">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-hdd"></use>
                                </svg>
                                介质管理
                                </MenuItem>
                                <MenuItem name="policy">
                                <!-- <Icon type="edit"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-xuanzewenjian"></use>
                                </svg>
                                策略管理
                                </MenuItem>
                                <MenuItem name="restore">
                                <!--  <Icon type="refresh"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-web-icon-"></use>
                                </svg>
                                恢复管理
                                </MenuItem>
                                <MenuItem name="report">
                                <!-- <Icon type="ios-browsers-outline"></Icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yiji-baobiaoguanli"></use>
                                </svg>
                                报表管理
                                </MenuItem>
                                <MenuItem name="sysset">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-cog"></use>
                                </svg>
                                系统设置
                                </MenuItem>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',width:'1000px'}">
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import icon from './iconfont.js'
export default {
  name: 'navigation',
  methods: {
    changeUrl(name) {
      this.$router.push('/' + name)
    }
  }
}
</script>