<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div style="font-weight: bold;" class="pb-3 ls2">이슈게시판</div>    
                <div class="tabs is-boxed">
                    <ul>
                        <li value="hot" @click="리스트정렬('hot')"><a :style="버튼색('hot')">인기</a></li>
                        <li value="latest" @click="리스트정렬('latest')"><a :style="버튼색('latest')">최신</a></li>
                        <li value="ten" @click="리스트정렬('ten')"><a :style="버튼색('ten')">10추</a></li>
                    </ul>
                </div>
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
                            {{item.subject}} 
                            <img v-if="item.file" src="http://50.16.27.105:3001/imgicon.png" width="16" height="16"> 
                            <span v-if="item.comments" style="color:#00D1B2"> [ {{item.comments}} ] </span><br>
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
        name: 'issues',
        mixins: [mymixin],
        data (){		
            return {	
                게시판종류 : "이슈",
                정렬 : "hot",
                데이터 : "",
                데이터수:0,
                페이지: 1,
            }
        }, 
        async created (){
            this.정렬 = this.$route.query.sort ? this.$route.query.sort : 'hot';
            this.데이터가져오기();
            this.아이피입력();
        },
        computed : {
            페이지개수 : function(){
                //listNumber 한 화면에 보여줄 데이터 수
                return Math.ceil(this.데이터수/process.env.listNumber); 
            },
        }, 
        methods : {	
            버튼색 (val){
                if(this.정렬 ==val){
                    return "background-color: #00D1B2; color: #fff";
                }
            },
            리스트정렬(val){
                this.페이지=1;
                this.정렬 = val;            
                this.라우터이동("" , {sort: this.정렬});
            },        
            async 데이터가져오기(){
                const param={
                    'category' : this.게시판종류,
                    'page' : this.페이지,
                    'sort' : this.정렬,
                    'listNumber' : process.env.listNumber
                }
                const axios = await this.$axios.post( '/boardList',this.$qs.stringify(param));
                if(axios.data.code==200){
                    this.데이터 = axios.data.dbo;
                    this.데이터수 = axios.data.data_cnt;
                }else{
                    alert("오류가 발생했습니다.");
                }     
            },
            async 아이피입력(){
                //ip 정보 받아오기
                const axios = await this.$axios.get('https://api.ipify.org?format=json');
			    const ip = axios.data.ip
                //

                const param={
                    'bd_no':0,
                    'id' : "issues",
                    'ip' : ip
                }
               await this.$axios.post( '/hitsUp',this.$qs.stringify(param)); 
            }     
        },
        watch : {
            정렬 (){
                this.데이터가져오기();
            },
            페이지 (){
                this.데이터가져오기();
            }
        }
    }
</script>