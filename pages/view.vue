<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div class="content">
                    {제목}
                </div>
            </div>
        
            <div class="card-content divider">
                <div class="content">
                    <span>{상점명}</span> <span class="divide_line"></span> <span>{날짜}</span>
                    <span style="float: right;">
                        <span>조회 {}</span> <span class="divide_line"></span> <span>댓글 {}</span> <span class="divide_line"></span> <span>추천 {}</span>
                    </span>    
                </div>
            </div>

            <div class="card-content">
                <div class="content">
                    {내용}
                </div>
            </div>

            <footer class="card-footer">
                <a href="#" class="card-footer-item">추천</a>
                <a href="#" class="card-footer-item">비추천</a>
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

            }
        },
        created : async function(){		
            
        },    
        computed : {
                
        }, 
        methods : {	
  
        },
        watch : {

        }
    }
</script>