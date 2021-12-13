module.exports = {  
    data : function(){		
        return {	
            유저아이디 :''
        }
    },
    created : async function(){		
        if(process.client){  
            let cid = this.$cookies.get("user_id");
            let cnn = this.$cookies.get("user_nickname");
            if(cid){
                this.유저아이디 = cid;
                this.유저닉네임 = cnn;
            }
        }
    },    
    computed : {
            
    }, 
    methods : {	
        페이지이동 (url){
            location.href=url;
        },
        라우터이동 (url , q){
            this.$router.push( {path: url, query: q } );
        },
        async 로그아웃(){
            if(!this.유저아이디){
                return;
            }
            let param={
                'id':this.유저아이디
            }
            let axios = await this.$axios.post( '/logout',this.$qs.stringify(param));
            if(axios.data.code==200){
                alert("로그아웃했습니다.");
                this.$cookies.remove("user_id");
                this.$cookies.remove("user_nickname");
                this.페이지이동("/");
            }else{
                alert("오류가 발생했습니다.");
            }  
        }
    },
    watch : {

    }
}