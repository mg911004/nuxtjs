<template> 
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io"><img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"></a>
            
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        
            <div id="navbarBasicExample" class="navbar-menu">
                 <div class="navbar-start">
                    <a class="navbar-item">Home</a>
                 </div>

                <div class="navbar-end">  
                    <div class="navbar-item">
                        <div class="buttons">
                            <a v-if="!유저아이디"  class="button is-primary" @click="라우터이동('signup')"><strong>회원가입</strong></a>
                            <a v-if="!유저아이디" class="button is-light" @click="라우터이동('login')">로그인</a>
                            <a v-if="유저아이디" class="button is-light" @click="로그아웃()">로그아웃</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </nav>
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    export default {  
        mixins: [mymixin],
    }
</script>


