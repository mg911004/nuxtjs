<template>
    <div> 
        <section class="section mt-6">
            <div class="container" style="width:550px;">
                <h2 class="center" style="font-size:20px; margin-bottom:10px">회원가입</h2>
                <div style="border: 1px solid #DEE1E4;" class="px-6 py-6">    
                    <div class="mt-2">
                        <input v-model="아이디" class="input is-primary is-large" type="text" placeholder="아이디" maxlength="15">
                    </div>
                    <div class="mt-2">
                        <input v-model="비밀번호" class="input is-primary is-large mt-2" type="password" placeholder="비밀번호" maxlength="16">
                    </div>
                    <div class="mt-2">
                        <input v-model="비밀번호확인" class="input is-primary is-large mt-2" type="password" placeholder="비밀번호확인" maxlength="16">
                    </div>
                    <div class="mt-2">
                        <input v-model="닉네임" class="input is-primary is-large mt-2" type="text" placeholder="닉네임" maxlength="6">
                    </div>

                    <div class="mt-3">
                        <button class="button is-primary is-large" style="width: 100%;">로그인</button>
                        <button @click="회원가입()" class="button is-light is-large mt-2" style="width: 100%;">회원가입</button>    
                    </div> 
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    //import Vue from 'vue';
    //import qs from '~/plugins/plugins.js';
    //Vue.use(qs);

    //import VueCookies from 'vue-cookies';
    //Vue.use(VueCookies);

    export default {  
        layout: 'noleft',
        name: 'signup',
        mixins: [mymixin],
        data (){		
            return {	
                아이디 : "",
                비밀번호 : "",
                비밀번호확인 : "",
                닉네임 : "",
            }
        },
        methods : {	
            async 회원가입 (){
                if(this.아이디==""){alert("아이디를 입력해 주세요.");return;}
                else if(this.아이디.length < 6 || this.아이디.length > 15){alert("아이디는 6~15자만 가능합니다.");return;}
                else if(!/^[A-Za-z]/.test(this.아이디)){alert("아이디의 시작은 영문자만 가능합니다.");return;}
                else if(!/^[A-Za-z0-9]+$/.test(this.아이디)){alert("아이디는 영문자와 숫자만 입력 가능합니다.");return;}

                else if(this.비밀번호==""){alert("비밀번호를 입력해 주세요.");return;}
                else if(this.비밀번호.length < 4 || this.비밀번호.length > 16){alert("비밀번호는 4~16자만 가능합니다.");return;}
                else if(this.비밀번호확인==""){alert("비밀번호 확인을 입력해 주세요.");return;}
                else if(this.비밀번호!=this.비밀번호확인){alert("비밀번호가 서로 다릅니다.");return;}

                else if(this.닉네임==""){alert("닉네임을 입력해 주세요.");return;}
                else if(this.닉네임.length < 2 || this.닉네임.length > 6 || !/^[가-힣]{2,6}$/.test(this.닉네임)){alert("닉네임은 2~6자의 한글만 가능합니다.");return;}
                
                ///////////////////////////////////////////////////////////////////////////작성해야함
                let param={
                    'id':this.아이디,
                    'pwd' : this.비밀번호,
                    'nickname' : this.닉네임
                }
                let axios = await this.$axios.post( '/join',this.$qs.stringify(param));
                if(axios.data.code==501){
                    alert("사용중인 아이디가 있습니다.");
                    return;
                }else if(axios.data.code==200){
                    alert("회원가입이 완료되었습니다.");
                    this.$cookies.set("user_id", axios.data.ssid,"1");
                    this.$cookies.set("user_nickname", axios.data.ssnickname,"1");
                    this.라우터이동("");
                }else{
                    alert("오류가 발생했습니다.");
                }                      
            }
        }
    }
</script>