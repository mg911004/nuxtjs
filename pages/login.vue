<template>
    <div> 
        <section class="section mt-6">
            <div class="container" style="width:550px;">
                <div style="border: 1px solid #DEE1E4;" class="px-6 py-6">
                    <div class="pb-4 center"><img src="logo.png" ></div> 
        
                    <div class="mt-2">
                        <input v-model="아이디" class="input is-primary is-large" type="text" placeholder="아이디">
                    </div>
                    <div class="mt-2">
                        <input v-model="비밀번호" class="input is-primary is-large mt-2" type="password" placeholder="비밀번호">
                    </div>

                    <div class="mt-3">
                        <button class="button is-primary is-large" style="width: 100%;" @click="로그인()">로그인</button>
                        <button class="button is-light is-large mt-2" style="width: 100%;" @click="페이지이동('/signup')">회원가입</button>    
                    </div> 
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    export default {  
        layout: 'noleft',
        name: 'login',
        mixins: [mymixin],
        data : function(){		
            return {	
                아이디 : "",
                비밀번호 : ""
            }
        },
        created : async function(){		
            if(this.유저아이디){
                this.라우터이동("/");
            }
        },    
        methods : {	
            async 로그인 (){
                let param={
                    'id':this.아이디,
                    'pwd':this.비밀번호
                }
                let axios = await this.$axios.post( '/login',this.$qs.stringify(param));
                if(axios.data.code==200){
                    this.$cookies.set("user_id", axios.data.ssid,"1");
                    this.$cookies.set("user_nickname", axios.data.ssnickname,"1");
                    this.라우터이동("/");
                }else if(axios.data.code==501){
                    alert("아이디 또는 비밀번호 오류입니다.");
                }else{
                    alert("오류가 발생했습니다.!");                    
                }
            }
        }
    }
</script>