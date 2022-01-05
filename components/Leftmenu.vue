<template>   
    <div class="card">
        <div class="card-content">
            <div v-if="유저아이디" style="font-weight: bold;" class="divider pb-4">
                <span style="color: #00D1B2;">{{유저닉네임}}</span>님 환영합니다 <br>
                <div style="margin-top: 5px;">
                    <a @click="라우터이동('/write')">
                        <button type="button" style="width: 100%; border:1px solid #00D1B2; color: #000; padding: 5px 0 5px 0; font-size: 14px;">글쓰기</button>
                    </a>
                </div>
            </div>      
            <aside class="menu mt-4">
                <p v-if="유저아이디" class="menu-label">내정보</p>
                <ul v-if="유저아이디" class="menu-list" style="font-size: 14px;">
                    <li><a @click="라우터이동('/mywrite')">내가 쓴 글</a></li>
                    <li><a @click="라우터이동('/mybookmark')">즐겨찾기</a></li>
                </ul>
                <p class="menu-label">커뮤니티</p>
                <ul class="menu-list" style="font-size: 14px;">
                    <li><a @click="라우터이동('/free')">자유</a></li>
                    <li><a @click="라우터이동('/humer')">유머</a></li>
                    <li><a @click="라우터이동('/issues')">이슈</a></li>
                </ul>
            </aside>
        </div>
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 

    export default {  
        mixins: [mymixin]
    }
</script>