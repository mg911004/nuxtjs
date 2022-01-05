<template> 
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" @click="페이지이동('')"><img src="logo.png" width="112" height="28"></a>
            
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
        
            <div id="navbarBasicExample" class="navbar-menu">             
                <div class="navbar-start is-hidden-desktop">    
                    <a v-if="유저아이디" class="navbar-item"><span style="color: #00D1B2;">{{유저닉네임}}</span> 님 환영합니다</a> 
                    <a v-if="유저아이디" class="navbar-item" @click="라우터이동('/write')">
                        <button type="button" style="width: 100%; border:1px solid #00D1B2; color: #000; padding: 5px 0 5px 0; font-size: 14px;">글쓰기</button>
                    </a>              
                    <div v-if="유저아이디" class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">내정보</a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">내가쓴글</a>
                            <a class="navbar-item">즐겨찾기</a>
                        </div>
                    </div>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">커뮤니티</a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">자유</a>
                            <a class="navbar-item">유머</a>
                            <a class="navbar-item">이슈</a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">  
                    <div class="navbar-item">
                        <div class="buttons">
                            <a v-if="!유저아이디"  class="button is-primary" @click="라우터이동('/signup')"><strong>회원가입</strong></a>
                            <a v-if="!유저아이디" class="button is-light" @click="라우터이동('/login')">로그인</a>
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
        mounted(){
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

            if ($navbarBurgers.length > 0) {
                $navbarBurgers.forEach( el => {
                    el.addEventListener('click', () => {
                        const target = el.dataset.target;
                        const $target = document.getElementById(target);

                        el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');

                    });
                });
            }
        }
    }
</script>


