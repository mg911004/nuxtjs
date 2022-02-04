# 커뮤니티사이트  - 1인 프로젝트

## 프로젝트 설명
    깔끔하고 직관적인 UI로 구성한 커뮤니티 사이트의 전반적인 기능을 구현한 프로젝트
 
## 개발 환경
> ### Fornt-End
    Bulma CSS, Javascript, nuxt.js, axios

> ### Back-End 
    node.js / express.js, MySQL, AWS EC2
        
## 디렉터리 구조
> ### layouts
    애플리케이션의 레이아웃을 포함하는 디렉토리 (default, noleft) 
> ### components   
    애플리케이션에서 사용될 컴포넌트들을 포함하는 디렉토리 (Header, Footer, Leftmunu)
> ### pages  
    애플리케이션의 view와 route를 포함하는 디렉토리
> ### mixins  
    여러 컴포넌트 간에 공통으로 사용하고 있는 로직, 기능들을 재사용하는 js파일을 포함하는 디렉토리
> ### assets  
    css를 포함한 디렉토리
> ### static  
    logo 이미지와 favicon을 포함하는 정적 파일들을 포함하는 디렉토리
> ### plugins  
    애플리케이션이 생성되기 전 자바스크립트 플러그인을 포함하는 디렉토리 (웹에디터,cookie 등 전역적인 구성요소 등록)
> ### nuxt.config.js  
    Nuxt.js의 사용자 정의 설정을 포함하는 파일
> ### package.json  
    애플리케이션의 의존성과 스크립트를 포함하는 파일 입니다.
 
     
## 주요기능
    * 쿠키와 세션을 사용한 로그인 및 로그아웃
    
    * 조건별 정렬/조회 및 페이징
    
    * toast-ui Editor 라이브러리를 적용해 사용자 편의에 따른 글쓰기 및, multer 모듈을 사용한 이미지업로드
    
    * 추천/비추천
    
    * 즐겨찾기
    
    * 댓글 및 ip를 인식한 조회수 적용 
    
    * 글작성내역 조회,글수정/삭제 

## 동작 구조

![구조-001](https://user-images.githubusercontent.com/87694251/152490865-350db763-90da-4739-9416-dd2c4de24066.jpg)


