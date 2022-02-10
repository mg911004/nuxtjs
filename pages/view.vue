<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div class="content" style="font-weight:bold">
                    {{등록글정보.subject}}
                </div>
            </div>
        
            <div class="card-content divider">
                <div class="content">
                    <span>{{등록글정보.nickname}}</span> <span class="divide_line"></span> <span>{{등록글정보.reg_date | 시간표시변환}}</span>
                    <span style="float: right;">
                        <span>조회 {{등록글정보.hits | 콤마표시}}</span> <span class="divide_line"></span> <span>댓글 {{등록글정보.comments | 콤마표시}}</span> <span class="divide_line"></span> <span>추천 {{등록글정보.gets | 콤마표시}}</span>
                    </span>    
                </div>

                <!---수정,삭제버튼--->
                <div v-if="유저아이디==등록글정보.id">
                    <button class="button is-small is-outlined" @click="라우터이동('../modify?bd_no='+등록글정보.bd_no)">수정</button>    
                    <button class="button is-danger is-small is-outlined" @click="글삭제()">삭제</button>
                </div> 
            </div>

            <div class="card-content">
                <div class="content">
                    <viewer v-if="등록글정보.content" :initialValue="등록글정보.content"/>
                </div>
            </div>

            <footer class="card-footer">
                <a class="card-footer-item" @click="추천비추천('추천')">추천 {{등록글정보.gets | 콤마표시}}</a>
                <a class="card-footer-item" @click="추천비추천('비추천')">비추천 {{등록글정보.degets | 콤마표시}}</a>
                <a class="card-footer-item" @click="즐겨찾기()" :style="즐겨찾기색">즐겨찾기</a>
            </footer>
        </div>

        <div class="card mt-3">
            <!---댓글개수--->
            <div class="card-content">
                <div class="content">  
                    댓글 <span style="color:red; font-weight:500">{{등록글정보.comments | 콤마표시}}</span>
                </div>
            </div>
            <!--//////-->

            <!---댓글작성창--->
            <div class="card-content">
                <div class="content">                
                    <textarea v-model="댓글내용" class="textarea has-fixed-size" placeholder="댓글 내용을 입력해주세요"></textarea>       
                </div>
            </div>
            <footer class="card-footer divider">
                <a class="card-footer-item" @click="댓글작성()">댓글등록</a>
            </footer>
            <!--///////////-->

            
            <!---댓글--->
            <div class="card-content divider" v-for="(item,i) in 댓글정보" :key="i">
                <div class="content">
                    <span style="font-weight:bold; font-size:0.9rem;">{{item.nickname}}</span> <span class="divide_line"></span> <span style="font-size:0.9rem;">{{item.reg_date | 시간표시변환}}</span>
                </div>
                <div class="content">
                    <span style="white-space: pre-line; font-size:0.9rem;">{{item.content}}</span>
                </div>
                <div class="content" v-if="유저아이디 && 유저아이디==item.id">
                    <span style="color:red; cursor:pointer" @click="댓글삭제(item.rp_no)">삭제</span>
                </div>
            </div>
            <!--//////-->
        </div>
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    export default {  
        name: 'views',
        mixins: [mymixin],
        data (){		
            return {	
                등록글정보 :{
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
                },
                댓글정보:{
                    rp_no : "",
                    id : "",
                    nickname : "",
                    content : "",
                    reg_date : ""
                },
                댓글내용 : "",
                계정당추천개수 : 0,
                즐겨찾기체크 : '',
                Options: {			
                    linkAttribute: {
                        target: '_blank',
                        contenteditable: 'false',
                        rel: 'noopener noreferrer'
                    }				
			    }
            }
        },
        async created(){	
            this.데이터가져오기();
            this.조회수증가();
        },    
        computed : {
            즐겨찾기색 : function(){
                if(this.즐겨찾기체크){
                    return 'color:#00D1B2'
                }else{
                    return 'color:#9E9E9E'
                }
            },
        }, 
        methods : {	
            async  조회수증가(){
                //ip 정보 받아오기
                const axios = await this.$axios.get('https://api.ipify.org?format=json');
			    const ip = axios.data.ip
                //

                const param={
                    'bd_no':this.$route.query.bd_no,
                    'id' : this.유저아이디,
                    'ip' : ip
                }
               await this.$axios.post( '/hitsUp',this.$qs.stringify(param)); 
  
            },
            async 데이터가져오기(){
                const param={
                    'bd_no' : this.$route.query.bd_no,
                    'id' : this.유저아이디
                }
                const axios = await this.$axios.post( '/boardView',this.$qs.stringify(param));
                if(axios.data.code==200){
                    this.등록글정보 = axios.data.dbo;
                    this.댓글정보 = axios.data.reply;
                    this.계정당추천개수 = axios.data.id_recomm;
                    this.즐겨찾기체크=axios.data.bookmark;             
                }else{
                    alert("오류가 발생했습니다.");
                }     
            },
            async 추천비추천(classtype){
                if(!this.유저아이디){this.페이지이동("login");return;}
                if(this.유저아이디==this.등록글정보.ID){alert('본인글에는 추천/비추천을 할 수 없습니다.');return;}
                if(this.계정당추천개수>=3){alert('추천/비추천은 계정당 3회만 가능합니다');return;}

                const param={
                    'id' : this.유저아이디,
                    'bd_no' : this.$route.query.bd_no,
                    'classtype' : classtype
                }
                const axios = await this.$axios.post( '/recommend',this.$qs.stringify(param));
                if(axios.data.code==200){
                    alert( classtype+"했습니다.");
                    this.데이터가져오기();
                }else{
                    alert("오류가 발생했습니다.");
                }    
            },
            async 즐겨찾기(){
                if(!this.유저아이디){this.페이지이동("login");return;}

                const param={
                    'id' : this.유저아이디,
                    'bd_no' : this.$route.query.bd_no
                }


                if(this.즐겨찾기체크){ //즐찾이 되어있을때 - (즐찾 삭제)
                    const axios = await this.$axios.post( '/bookmark_del',this.$qs.stringify(param));
                    if(axios.data.code==200){
                        this.즐겨찾기체크 = 0;
                    }else{
                        alert("오류가 발생했습니다.");
                    } 
                }else{ //즐찾이 안되어있을때 - (즐찾 등록)
                    const axios = await this.$axios.post( '/bookmark_ins',this.$qs.stringify(param));
                    if(axios.data.code==200){
                        this.즐겨찾기체크 = 1;
                    }else{
                        alert("오류가 발생했습니다.");
                    } 
                }
            },
            async 댓글작성(){
                if(!this.유저아이디){this.페이지이동("login");return;}
                if(!this.댓글내용){alert('내용을 입력해 주세요.');return;}

                const param={
                    'id' : this.유저아이디,
                    'nickname' : this.유저닉네임,
                    'bd_no' : this.$route.query.bd_no,
                    'content' : this.댓글내용
                }
                const axios = await this.$axios.post( '/reply_ins',this.$qs.stringify(param));
                if(axios.data.code==200){
                    alert("등록되었습니다.");
                    this.데이터가져오기();
                    this.댓글내용 = "";
                }else{
                    alert("오류가 발생했습니다.");
                }   
            },
            async 댓글삭제(val){
                if(confirm('삭제하시겠습니까?')){
                    const param={
                        'rp_no' : val,
                        'bd_no' : this.$route.query.bd_no,
                        'content' : this.댓글내용
                    }
                    const axios = await this.$axios.post( '/reply_del',this.$qs.stringify(param));
                    if(axios.data.code==200){
                        alert("삭제되었습니다.");
                        this.데이터가져오기();
                    }else{
                        alert("오류가 발생했습니다.");
                    }   
                }
            },
            async 글삭제(){
                if(confirm('삭제하시겠습니까?')){
                    const param={
                        'id' : this.유저아이디,
                        'bd_no' : this.$route.query.bd_no
                    }
                    const axios = await this.$axios.post( '/delete',this.$qs.stringify(param));
                    if(axios.data.code==200){
                        alert("삭제되었습니다.");
                        this.라우터이동("free");
                    }else{
                        alert("오류가 발생했습니다.");
                    }   
                }
            }
        }
    }
</script>