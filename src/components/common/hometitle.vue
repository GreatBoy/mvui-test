<template>
    <header>
        <a v-link="{path:'/home' , activeClass:'active'}">
            <Icon v-if="icon" class="mv-icon-arrow-left mv-icon-class"></Icon>
        </a>
        <slot></slot>
    </header>
</template>
<script>
    import { Icon } from 'mvui';
    export default{  
        props: {
            icon: {
                type: Boolean,
                default: true
            }
        }, 
        components: { 
            Icon,
        }
    }
</script>
<style lang="less">
    header{
        height: 0.45rem;
        line-height: 0.45rem;
        color: #1da7fe;
        background: white;
        box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
        text-align: center;
        font-size: 0.16rem;
        font-weight: bold;
    }
    .home-img{
        height: 0.5rem;
        position: relative;
        top: 0px;
    }
    .mv-icon-class{
        font-size: 0.28rem;
        color: #1da7fe;
        position: absolute;
        left: 0.1rem;
    }
</style>
