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
        
            <div class="mt-2" id="editor"></div>

            <div class="buttons mt-3" style="float: right;">
                <button class="button is-light">취소</button>
                <button @click="글등록()" class="button is-primary">작성완료</button>     
            </div>
        </div>                        
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
   /*
    const Editor = toastui.Editor;

    const editor = new Editor({
        el: document.querySelector('#editor'),
        height: '580px',
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical'
    });
    */

    export default {  
        head() { 
            return {			
                script: [
                    { src: "https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js" }
                ],				
                link: [
                    { rel: 'stylesheet', href: 'https://uicdn.toast.com/editor/latest/toastui-editor.min.css' }
                ], 
            }
        },
        name: 'write',
        mixins: [mymixin],
        data : function(){		
            return {	
                분류:"자유",
                제목:"",
                내용:""
            }
        },
        created : async function(){		
            
        },    
        computed : {
                
        }, 
        methods : {	
            글등록 (){
        
            }
        },
        watch : {

        }
    }
</script>