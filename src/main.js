import Vue from 'vue';
import VueRouter from 'vue-router';


//引入组件
import App from './app.vue';
import home from './components/home.vue';
// 组件
import buttons from './components/button.vue';


Vue.use(VueRouter);
var app=Vue.extend(App);
var router=new VueRouter();

//配置路由
router.map({
  '/home': {
    component: home
  },
  '/button': {
    component: buttons
  }
});


//设置默认情况下打开的页面
router.redirect({
  '/':'home'
});

router.start(app,'#app');

//暴露路由接口调试
window.router = router;


