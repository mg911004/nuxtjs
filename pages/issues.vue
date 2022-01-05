<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div style="font-weight: bold;" class="pb-3">자유게시판</div>    
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
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th style="width: 4rem;">추천</th>
                        <th>제목</th>
                        <th style="width: 8rem;">작성자</th>
                        <th style="width: 13rem;">등록일</th>
                    </tr>
                </thead>

                <tbody>
                    <tr @click="라우터이동('view?bd_no='+item.BD_NO)" style="cursor:pointer"  v-for="(item,i) in 데이터" :key="i">
                        <th>{{item.GETS}}</th>
                        <td>{{item.SUBJECT}}</td>
                        <td>{{item.NICKNAME}}</td>
                        <td>{{item.REG_DATE | 시간표시변환}}</td>                    
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
        data : function(){		
            return {	
                게시판종류 : "이슈",
                정렬 : "hot",
                데이터 : "",
                데이터수:0,
                페이지: 1,
            }
        }, 
        async created (){
            if (process.client) {
                this.정렬 = this.$route.query.sort ? this.$route.query.sort : 'hot';
                this.데이터가져오기();
            }
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
                this.정렬 = val;            
                this.라우터이동(window.location.pathname.slice(1) , {sort: this.정렬});
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