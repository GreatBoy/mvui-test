
<template>
<div class="home">
    <div class="home-list">
        <div class="home-list-title">base</div>
        <ul>
            <li><a v-link="{path:'/button' , activeClass:'active'}">Button 按钮</a></li>
        </ul>
    </div>
</div>
</template>
<script>
import Hometitle from './common/hometitle.vue';
export default{
    data(){
        return {
            
        }
    },
    components:{
        Hometitle
    },
    route:{
        data() {
            /*每次切换路由，在渲染出页面前都会执行*/
        }
    }
}
</script>
<style lang="less">
    .home-list {
        .home-list-title{
            height: 0.45rem;
            line-height: 0.45rem;
            border-bottom: 1px solid #e6e6e6;
            padding-left:0.1rem;
            font-size: 0.16rem;
            color: #aaa;
        }
        ul li{
            height: 0.45rem;
            line-height: 0.45rem;
            border-bottom: 1px solid #e6e6e6;
            padding-left:0.2rem;
            font-size: 0.13rem;
            background: white;
            color: black;
            a{
                display: block
            }
        }
    }
</style>