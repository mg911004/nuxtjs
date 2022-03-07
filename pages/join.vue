<template>
    <div> 
        <section class="section mt-6">
            <div class="container">
                <h2 class="center" style="font-size:20px;">회원가입</h2>
                <div style="border: 1px solid #DEE1E4;" class="px-6 py-6">       
                    <div class="mt-2">
                        <input class="input is-primary is-large" type="text" v-model="아이디" maxlength="16" placeholder="아이디">{{아이디}}
                    </div>
                    <div class="mt-2">
                        <input class="input is-primary is-large mt-2" type="password" v-model="비밀번호" maxlength="16" placeholder="비밀번호">
                    </div>
                    <div class="mt-2">
                        <input class="input is-primary is-large mt-2" type="password" v-model="비밀번호확인" maxlength="16" placeholder="비밀번호확인">
                    </div>
                    <div class="mt-2">
                        <input class="input is-primary is-large mt-2" type="text" v-model="닉네임" maxlength="6" placeholder="닉네임">
                    </div>

                    <div class="mt-3">
                        <button class="button is-primary is-large" @click="회원가입()" style="width: 100%;">회원가입</button>
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
        name: 'join',
        mixins: [mymixin],
        data (){		
            return {	
                아이디 : "",
                비밀번호 : "",
                비밀번호확인 : "",
                닉네임 : ""
            }
        },
        methods : {	
            회원가입 : function(){
                const regName = /^[가-힣]{2,6}$/;
                if(this.아이디==""){alert("아이디를 입력해 주세요"); return;}
                if (this.아이디.length < 6){alert("아이디는 6자 이상만 가능합니다."); return;}
                if( this.비밀번호==""){alert("비밀번호를 입력해 주세요");return;}
                if( this.비밀번호 != this.비밀번호확인 ){alert("비밀번호가 서로 다릅니다.");return;}
                if (this.닉네임==""){alert("별명을 입력해 주세요."); return;} 
                if(!regName.test(this.닉네임)){alert("별명은 한글 2자 이상 6자 이하만 가능합니다."); return;}
                alert("회원가입이 완료되었습니다.");
                location.href="index.html";       
            }
        }
    }
</script>