<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div style="font-weight: bold;" class="ls2">즐겨찾기</div>    
            </div>
        </div>

        <div class="card mt-3">
            <!--pc-->
            <table class="table is-fullwidth ls2 is-hidden-touch">
                <thead>
                    <tr>
                        <th style="width: 4rem;">추천</th>
                        <th>제목</th>
                        <th style="width: 8rem;">작성자</th>
                        <th style="width: 13rem;">등록일</th>
                    </tr>
                </thead>

                <tbody>
                    <tr @click="라우터이동('../view?bd_no='+item.bd_no)" style="cursor:pointer"  v-for="(item,i) in 데이터" :key="i">
                        <td>{{item.gets}}</td>
                        <td>
                            {{item.subject}} 
                            <img v-if="item.file" src="http://50.16.27.105:3001/imgicon.png" width="16" height="16"> 
                            <span v-if="item.comments" style="color:#00D1B2"> [ {{item.comments}} ] </span>
                        </td>
                        <td>{{item.nickname}}</td>
                        <td>{{item.reg_date | 시간표시변환}}</td>                  
                    </tr>
                </tbody>
            </table>   

             <!--모바일-->
            <table class="table is-fullwidth ls2 is-hidden-desktop">
                <tbody>
                    <tr @click="라우터이동('../view?bd_no='+item.bd_no)" style="cursor:pointer"  v-for="(item,i) in 데이터" :key="i">
                        <td>
                            {{item.subject}} <span v-if="item.comments" style="color:#00D1B2"> [ {{item.comments}} ] </span><br>
                            {{item.nickname}} <span class="divide_line"></span>  {{item.reg_date | 시간표시변환}}
                        </td>              
                    </tr>
                </tbody>
            </table>                               
        </div>
        <v-pagination v-model="페이지" :length="페이지개수" :total-visible="7" color="#00D1B2" class="mt-5"></v-pagination>	
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    export default {  
        name: 'mybookmark',
        mixins: [mymixin],
        data (){		
            return {	
                데이터 : [{
                    bd_no : "",
                    id : "",
                    nickname : "",
                    category : "",
                    subject : "",
                    content : "",
                    gets : 0,
                    degets : 0,
                    hits : 0,
                    comments : 0,
                    hide : 0,
                    reg_date : ""
                }],
                데이터수:0,
                페이지: 1
            }
        },
        async created (){
            if(!this.유저아이디){this.페이지이동("login");return;}
            this.데이터가져오기();
        },  
        computed : {
            페이지개수 : function(){
                //listNumber 한 화면에 보여줄 데이터 수
                return Math.ceil(this.데이터수/process.env.listNumber); 
            }, 
        }, 
        methods : {	  
            async 데이터가져오기(){
                const param={
                    'id' : this.유저아이디,
                    'page' : this.페이지,
                    'listNumber' : process.env.listNumber
                }
                const axios = await this.$axios.post( '/myBookmark',this.$qs.stringify(param));
                if(axios.data.code==200){
                    this.데이터 = axios.data.dbo;
                    this.데이터수 = axios.data.data_cnt;
                }else{
                    alert("오류가 발생했습니다.");
                }     
            }         
        },
        watch : {
            페이지 (){
                this.데이터가져오기();
            }
        }
    }
</script>