<template>
    <div>
        <div class="px-4">
            <div class="select is-primary">
                <select v-model="분류">
                    <option>자유</option>
                    <option>유머</option>
                    <option>이슈</option>
                </select>               
            </div>
            <div class="mt-2">
                <input v-model="제목" class="input is-primary" type="text" placeholder="제목">
            </div>          
        
            <editor v-if="내용" class="mt-2" height="500px" initialEditType="wysiwyg" :options="Options" ref="내용" :initialValue="내용"/>

            <div class="buttons mt-3" style="float: right;">
                <button class="button is-light" @click="취소()">취소</button>
                <button @click="글등록()" class="button is-primary">수정하기</button>     
            </div>
        </div>                        
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    export default {  
        name: 'modify',
        mixins: [mymixin],
        data(){		
            return {	
                분류:"",
                제목:"",
                내용:"",
                Options: {
				    language : "ko",
                    hooks :{
                        addImageBlobHook: async (file, callback) => {							
                            const imgHttp = await this.imgUpLoad(file); //저장된 이미지 주소값					
                            callback(imgHttp,'addImage');						
                            return false;
                        }
                    },
			    },
            }
        },
        async created(){	
            if(!this.유저아이디){this.페이지이동("login");return;}
            this.데이터가져오기();
        },    
        methods : {	
            async 데이터가져오기(){
                const param={
                    'bd_no' : this.$route.query.bd_no
                }
                const axios = await this.$axios.post( '/boardView',this.$qs.stringify(param));
                if(axios.data.code==200){
                    this.분류 = axios.data.dbo.category;
                    this.제목 = axios.data.dbo.subject;
                    this.내용 = axios.data.dbo.content;
                }else{
                    alert("오류가 발생했습니다.");
                }     
            },
            async 글등록 (){
                if(!this.유저아이디){this.페이지이동("login");return;}
                if(!this.분류){alert('분류를 선택해 주세요.'); return}
                if(!this.제목){alert('제목을 입력해 주세요.'); return}
                if(!this.$refs.내용.invoke('getMarkdown')){alert('내용을 입력해 주세요.'); return}

                let imgChk = this.$refs.내용.invoke('getMarkdown').match(/\[addImage\]/g); 
                if(imgChk != null) {
                    if(imgChk.length>10){
                        alert('이미지는 최대 10개까지만 첨부 가능합니다.');
                        return;
                    }
                }

                let param={        
                    'bd_no':this.$route.query.bd_no,
                    'id':this.유저아이디,
                    'nickname':this.유저닉네임,   
                    'category':this.분류,
                    'subject':this.제목,
                    'content':this.$refs.내용.invoke('getMarkdown'),
                    'file': 0
                }

                if(imgChk != null){
                    param.file = 1;
                }

                let axios = await this.$axios.post( '/modify',this.$qs.stringify(param));
                if(axios.data.code==200){
                    this.라우터이동('../view', {bd_no:this.$route.query.bd_no});
                }else{
                    alert("오류가 발생했습니다.");              
                }
            },
            async imgUpLoad (file){
                //올린 이미지 백엔드 서버로 업로드 시킨 후 이미지 주소값 리턴
                let data = new FormData();

                data.append('img', file);			

                let axios = await this.$axios.post( process.env.imgUpLoadURL+'/upload',data)	
                if(axios.data.code==200){				
                    return process.env.imgUpLoadURL+'/'+axios.data.file.filename;
                }else {
                    alert('오류가 발생했습니다.');
                }
		    },
            취소(){
                history.go(-1);
            }
        }
    }
</script>