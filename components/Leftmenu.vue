<template>   
    <div>
        <div class="card ls2">
            <div class="card-content">

                <div v-if="유저아이디" style="font-weight: bold;" class="divider pb-4">
                    <span style="color: #00D1B2;">{{유저닉네임}}</span>님 환영합니다 <br>
                    <div style="margin-top: 5px;">
                        <a @click="라우터이동('/write')">
                            <button type="button" style="width: 100%; border:1px solid #00D1B2; color: #000; padding: 5px 0 5px 0; font-size: 14px;">글쓰기</button>
                        </a>
                    </div>
                </div> 
                <div v-else>
                    <div style="margin-top: 5px;">
                        <a @click="라우터이동('/login')">
                            <button type="button" style="width: 100%; border:1px solid #00D1B2; color: #000; padding: 5px 0 5px 0; font-size: 14px;">로그인</button>
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

        <!-- 채팅구역 -->
        <div class="card mt-4 ls2">
            <nav class="panel is-primary">
                <p class="panel-heading" style="font-size:15px">채팅</p>
                <div class="panel-block" v-autobottom="true" style="height:350px; overflow-y:scroll;">
                    <div>
                        <div v-for="(item,i) in messages" :key="i">
                            <b>{{item.nickname}} : &nbsp; </b>
                            <span>{{item.msg}}</span>
                        </div>
                    </div>
                </div>    
                <div class="panel-block">    
                    <input v-model="입력메시지" class="input is-primary" type="text" placeholder="채팅 입력" maxlength="30"  @keyup.enter="전송()">
                    <button class="button is-light" @click="전송()">전송</button>
                </div>
            </nav>
        </div>
        <!--//-->
    </div>
</template>

<script>
    const Pusher = require('pusher-js');
    const mymixin = require('~/mixins/total.js'); 

    export default {  
        mixins: [mymixin],
         data() {
            return{
                messages: [],
                channel : {},
                pusher : {},
                입력메시지:''
            }    
        },
        async mounted () {
            this.채팅방입장();     
        },  
        methods : {	
            async 채팅방입장 (){

                const param={
                    'ChatLimitNum' : process.env.ChatLimitNum
                }         
                const axios = await this.$axios.post('/chatSel',this.$qs.stringify(param));

                if(axios.data.code==200){
                    this.messages=axios.data.dbo;
                }else{
                    return;
                }

                // 채팅방 참여자 등록                  
                this.pusher = new Pusher('407cb2ae1ebb455e1244', {
                    cluster: 'ap3'
                });      

                // 채팅방 입장
                this.channel = this.pusher.subscribe('my-channel');

                // 메시지 출력 바인딩
                this.channel.bind('my-event', (data)=>{
                    this.messages.push({ id:data.id, nickname: data.nickname, msg: data.msg});                    
                });            
            },	
            async 전송(){                            
                if(!this.입력메시지){alert('메시지를 입력해 주세요.');return;}

                let param={
                    id : this.유저아이디,
                    nickname : this.유저닉네임,
                    msg : this.입력메시지
                }


                //비회원 채팅 작성시 id => 손님 / nickname => 손님+'ip맨뒷자리수'
                if(!this.유저아이디){
                    //ip 정보 받아오기
                    const axios = await this.$axios.get('https://api.ipify.org?format=json');
                    const ip = axios.data.ip.split('.')[3];
                    param.id = "손님";
                    param.nickname = "손님"+ip;
                }

                this.입력메시지 = '';                                  
                await this.$axios.post('/chatWrite',this.$qs.stringify(param));     
            }
        }
    }
</script>