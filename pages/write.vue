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
            글등록 (){
                //this.$refs.내용.invoke('getMarkdown')
                //insert axios코드 작성
            }
        },
        watch : {

        }
    }
</script>