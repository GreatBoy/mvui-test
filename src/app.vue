<template>
    <div class="main">
        <router-view
          keep-alive
          :transition="transitions"
        ></router-view>
    </div>
</template>

<script>
    const ROUTERKEY = "routerkey";
    export default{
        data (){
            return{
               'transition' : 'vux-pop-in'
            }
        },
        computed : {
            transitions(){
                return this.transition;
            }
        },
        ready(){
            var self = this;
            var transDirect = 'vux-pop-in';
            var routerData = {
                push ( hashStr ) {
                    var routerArr = this.get() || [];
                    if( routerArr.pop != hashStr ){
                        routerArr.push(hashStr);
                    }
                    this.set(routerArr);
                },
                get () {
                    return JSON.parse(window.localStorage.getItem(ROUTERKEY) || '[]');
                },
                set ( items ) {
                    window.localStorage.setItem(ROUTERKEY,JSON.stringify(items));
                },
                pop () {
                    var routerArr = this.get();
                    routerArr.pop();
                    this.set(routerArr);
                },
                clear (){
                    this.set([]);
                },
                change (hasStr) {
                    var routerArr = this.get(); 
                    var arrPop = routerArr.pop();
                    if( arrPop ) {
                        var newPop = routerArr.pop();
                        if(newPop){
                            if(newPop == hasStr ) {
                                transDirect = 'vux-pop-out';
                                self.transition = transDirect;
                                this.pop();
                            }  else {
                                transDirect = 'vux-pop-in';
                                self.transition = transDirect;
                                this.push(hasStr);
                            }
                        } else {
                            transDirect = 'vux-pop-in';
                            self.transition = transDirect;
                            this.push(hasStr);
                        }
                    } else {
                        this.push(hasStr);
                    }

                    if( location.hash == '#!/home' ){
                        this.clear();
                        this.push(location.hash);
                    }
                }
            }

            if(window.onpopstate){
                let oldCall = window.onpopstate;
                window.onpopstate = function(){
                    oldCall();
                    routerData.change(location.hash);
                }
            } else {
                window.onpopstate = function(){
                    routerData.change(location.hash);
                }
            }

            routerData.clear();
            routerData.push(location.hash);
        },
        destroyed(){

        },
        methods:{
           
        }
    }
</script>