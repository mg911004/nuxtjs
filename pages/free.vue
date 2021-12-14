<template>
    <div>
        <div class="card">
            <div class="card-content">
                <div style="font-weight: bold;" class="pb-3">자유</div>    
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
                        <th>작성자</th>
                        <th><abbr>등록일</abbr></th>
                    </tr>
                </thead>

                <tbody>
                    <tr @click="경로이동()" style="cursor:pointer">
                        <th>1</th>
                        <td>안녕하세요2</td>
                        <td>38</td>
                        <td>23</td>                    
                    </tr>
                </tbody>
            </table>                           
        </div>
        <v-pagination v-model="페이지" :length="7" color="#FFAB00" class="mb-2"></v-pagination>	

        
        <nav class="pagination is-centered mt-5" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a>
            <ul class="pagination-list">
                <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                <li><span class="pagination-ellipsis">&hellip;</span></li>
                <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
    const mymixin = require('~/mixins/total.js'); 
    export default {  
        name: 'free',
        mixins: [mymixin],
        data : function(){		
            return {	
                게시판종류 : "자유게시판",
                정렬 : "",
                페이지: 1,
                버튼모음 : ''
            }
        }, 
        computed : {
                
        }, 
        methods : {	
            버튼색 (val){
                this.정렬 = this.$route.query.sort ? this.$route.query.sort : 'hot';
                if(this.정렬==val){
                    return "background-color: #00D1B2; color: #fff";
                }
            },
            경로이동(){
                this.페이지이동("view?id_no=1&category="+this.게시판종류+"&sort="+this.정렬+"&page=1");
            },
            리스트정렬(val){
                this.라우터이동(window.location.pathname , {sort: val});
            }      
        },
        watch : {

        }
    }
</script>
