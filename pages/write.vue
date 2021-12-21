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
        
        	<no-ssr>
                <editor height="500px" initialEditType="wysiwyg" :options="Options" ref="내용"/>
            </no-ssr>

            <div class="buttons mt-3" style="float: right;">
                <button class="button is-light">취소</button>
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
				    language : "ko"
			    },
            }
        },
        async created(){		
            
        },    
        computed : {
                
        }, 
        methods : {	
            async 글등록 (){
                if(!this.유저아이디){this.페이지이동("login");return;}
                if(!this.분류){alert('분류를 선택해 주세요.'); return}
                if(!this.제목){alert('제목을 입력해 주세요.'); return}
                if(!this.$refs.내용.invoke('getMarkdown')){alert('내용을 입력해 주세요.'); return}

                let param={        
                    'id':this.유저아이디,
                    'nickname':this.유저닉네임,   
                    'category':this.분류,
                    'subject':this.제목,
                    'content':this.$refs.내용.invoke('getMarkdown')
                }
                let axios = await this.$axios.post( '/write',this.$qs.stringify(param));
                if(axios.data.code==200){
                    this.라우터이동('view', {id_no:axios.data.bd_no,category:this.분류} );
                }else{
                    console.log(axios.data.msg)
                    alert("오류가 발생했습니다.");              
                }
            }
        },
        watch : {

        }
    }
</script>