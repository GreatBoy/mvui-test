<template>  
    <div class="body-wrapper">
        <Hometitle>Button</Hometitle>
        <div class="wrapper-example">
            
            <div class="wrapper-area">
                <div class="wrapper-area-title">默认形状</div>
                <div class="wrapper-area-content">
                    <Button @click="click">默认按钮</Button>
                </div>
            </div>

            <div class="wrapper-area">
                <div class="wrapper-area-title">形状控制</div>
                <div class="wrapper-area-content">
                    <Button shape="round">圆角按钮</Button>
                    <Button shape="round" disabled="disabled">disabled</Button>
                </div>
            </div>

            <div class="wrapper-area">
                <div class="wrapper-area-title">颜色</div>
                <div class="wrapper-area-content">
                    <Button class="mv-btn-primary" type="submit">primary</Button>
                    <Button class="mv-btn-success">success</Button>
                    <Button class="mv-btn-warning">warning</Button>
                    <Button class="mv-btn-danger">danger</Button>
                    <Button class="mv-btn-royal">royal</Button>
                </div>
            </div>

            <div class="wrapper-area">
                <div class="wrapper-area-title">是否有背景色</div>
                <div class="wrapper-area-content">
                    <Button class="mv-btn-primary" type="submit">primary</Button>
                    <Button class="mv-btn-primary" type="submit" :plain="true">primary</Button>
                    <Button class="mv-btn-primary" type="submit" :plain="true" shape="round">primary</Button>
                    <Button class="mv-btn-primary" type="submit" :plain="true" shape="round" disabled="disabled">primary</Button>
                </div>
            </div>

            <div class="wrapper-area">
                <div class="wrapper-area-title">是否有icon以及修改icon样式</div>
                <div class="wrapper-area-content">
                    <Button class="mv-btn-primary" icon="mv-icon-loading-1" icon-style="font-size: 0.14rem;">加载中...</Button>
                    <Button class="mv-btn-primary" icon="mv-icon-loading-1" icon-style="color: red;font-size: 0.14rem;">加载完成</Button>
                </div>
            </div>

            <div class="wrapper-area">
                <div class="wrapper-area-title">点击事件</div>
                <div class="wrapper-area-content">
                    <Button @click="click">按钮点击</Button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import Hometitle from './common/hometitle.vue';
    import { Button } from 'mvui';
    export default{   
        components: { 
            Hometitle,
            Button
        },
        methods: {
            click(event){
                console.log(event);
                debugger;
            }
        }
    }
</script>
<style lang="less">
    .mv-btn{
        margin-top: 0.05rem;
    }
</style>