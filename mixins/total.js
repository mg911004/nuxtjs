const numeral = require('numeral');
const moment = require('moment');

module.exports = {  
    data (){		
        return {	
            유저아이디 :''
        }
    },
    async created (){		
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
        },
    },
    filters :{
        콤마표시(value){
			return numeral(value).format('0,0');
        },
        시간표시변환(val){
            let betweenTime = moment.duration(moment().diff(val));
				
            if(betweenTime.asHours() > 1){  // 1시간 기준
                if(betweenTime.asDays() > 1){  // 24시간 기준
                    if(betweenTime.asYears() >1){ // 365일 기준
                        return Math.floor( betweenTime.asYears() )+"년 전";
                    }else{
                        return Math.floor( betweenTime.asDays() )+"일 전";
                    }
                }else{ 
                    return Math.floor( betweenTime.asHours() )+"시간 전";
                }	
            }else{ 
                if(betweenTime.asMinutes() > 1){ // 1분 기준
                    return Math.floor( betweenTime.asMinutes() )+"분 전";
                }else{
                    if(betweenTime.asSeconds() < 1){
                        return "1초 전";
                    }else{
                        return Math.floor( betweenTime.asSeconds() )+"초 전";
                    }
                }			
            }		
        }
    }
}