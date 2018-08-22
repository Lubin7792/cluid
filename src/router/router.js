import VueRouter from 'vue-router';
import Login from '../views/login/login.vue';
import Navigation from '../views/navigation/navigation.vue';
import Client from '../views/client/client.vue';
const Routers = [
    {
        path:'/login',
        name:'login',
        component:Login
    },
    {
    	path:'/navigation',
    	name:'navigation',
    	component:()=>import('../views/navigation/navigation.vue')
    },  {
        path: '/',
        component: Navigation,
        children: [
            { path: 'home', name: 'home', component: () => import('../views/home/home.vue') }]
    },
    {
        path:'/',
        component:Navigation,
        children: [
        { path: 'usermanager',  name: 'usermanager', component: () => import('../views/usermanager/usermanager.vue') }]
    },{
        path:'/',
        component:Navigation,
        children: [
        { path: 'taskmonitor',  name: 'taskmonitor', component: () => import('../views/taskmonitor/taskmonitor.vue') }]
       
    },{
        path:'/',
        component:Navigation,
        children:[{path:'client',name:'client',component:()=>import('../views/client/client.vue')}]
    },{
        path:'/',
        component:Navigation,
        children:[{path:'servicemanager',name:'servicemanager',component:()=>import('../views/servicemanager/servicemanager.vue')}]
    },{
        path:'/',
        component:Navigation,
        children:[{path:'syslog',name:'syslog',component:()=>import('../views/syslog/syslog.vue')}]
    },{
        path:'/',
         component:Navigation,
        children:[{path:'mediaserver',name:'mediaserver',component:()=>import('../views/mediaserver/mediaserver.vue')}]
    },{
        path:'/',
        component:Navigation,
        children:[{path:'volume',name:'volume',component:()=>import('../views/volume/volume.vue')}]
    },{
        path:'/',
        component:Navigation,
        children:[{path:'policy',name:'policy',component:()=>import('../views/policy/policy')}]
    },{
        path:'/restore'
    },{
        path:'/report'
    },{
        path:'/sysset'
    },{
        path: '*',
        redirect: '/login'
    }
];


export default Routers;