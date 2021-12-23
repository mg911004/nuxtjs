<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    {{등록글정보.SUBJECT}}
                </div>
            </div>
        
            <div class="card-content divider">
                <div class="content">
                    <span>{{등록글정보.NICKNAME}}</span> <span class="divide_line"></span> <span>{{등록글정보.REG_DATE}}</span>
                    <span style="float: right;">
                        <span>조회 {{등록글정보.HITS}}</span> <span class="divide_line"></span> <span>댓글 {{등록글정보.COMMENTS}}</span> <span class="divide_line"></span> <span>추천 {{등록글정보.GETS}}</span>
                    </span>    
                </div>
            </div>

            <div class="card-content">
                <div class="content">
                    <viewer v-if="등록글정보.CONTENT" :initialValue="등록글정보.CONTENT"/>
                </div>
            </div>

            <footer class="card-footer">
                <a class="card-footer-item">추천 {{등록글정보.GETS}}</a>
                <a href="#" class="card-footer-item">비추천 {{등록글정보.DEGETS}}</a>
                <a href="#" class="card-footer-item">즐겨찾기</a>
            </footer>
        </div>
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    export default {  
        name: 'views',
        mixins: [mymixin],
        data : function(){		
            return {	
                등록글정보 :{
                    BD_NO : "",
                    ID : "",
                    NICKNAME : "",
                    CATEGORY : "",
                    SUBJECT : "",
                    CONTENT : "",
                    GETS : 0,
                    DEGETS : 0,
                    HITS : 0,
                    HIDE : 0,
                    REG_DATE : ""
                },
                Options: {			
                    linkAttribute: {
                        target: '_blank',
                        contenteditable: 'false',
                        rel: 'noopener noreferrer'
                    }				
			    }
            }
        },
        created : async function(){	
            if (process.client) {	
                this.데이터가져오기();
            }
        },    
        computed : {
                
        }, 
        methods : {	
            async 데이터가져오기(){
                const param={
                    'bd_no' : this.$route.query.bd_no
                }
                const axios = await this.$axios.post( '/boardView',this.$qs.stringify(param));
                if(axios.data.code==200){
                    console.log(axios.data.dbo)
                    this.등록글정보 = axios.data.dbo;
                }else{
                    alert("오류가 발생했습니다.");
                }     
            }  
        },
        watch : {

        }
    }
</script>