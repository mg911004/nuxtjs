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
        
            <editor class="mt-2" height="500px" initialEditType="wysiwyg" :options="Options" ref="내용"/>

            <div class="buttons mt-3" style="float: right;">
                <button class="button is-light" @click="취소()">취소</button>
                <button @click="글등록()" class="button is-primary">작성완료</button>     
            </div>
        </div>                        
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    export default {  
        name: 'write',
        mixins: [mymixin],
        data(){		
            return {	
                분류:"자유",
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
            
        },    
        methods : {	
            async 글등록 (){
                if(!this.유저아이디){this.페이지이동("login");return;}
                if(!this.분류){alert('분류를 선택해 주세요.'); return}
                if(!this.제목){alert('제목을 입력해 주세요.'); return}
                if(!this.$refs.내용.invoke('getMarkdown')){alert('내용을 입력해 주세요.'); return}

                const param={        
                    'id':this.유저아이디,
                    'nickname':this.유저닉네임,   
                    'category':this.분류,
                    'subject':this.제목,
                    'content':this.$refs.내용.invoke('getMarkdown')
                }
                const axios = await this.$axios.post( '/write',this.$qs.stringify(param));
                if(axios.data.code==200){
                    this.라우터이동('view', {bd_no:axios.data.bd_no} );
                }else{
                    alert("오류가 발생했습니다.");              
                }
            },
            async imgUpLoad (file){
                //올린 이미지 백엔드 서버로 업로드 시킨 후 이미지 주소값 리턴
                let data = new FormData();

                data.append('img', file);			

                let axios = await this.$axios.post( '/upload',data)	
                if(axios.data.code==200){				
                    return process.env.nodeURL+'/'+axios.data.file.filename;
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