# 커뮤니티사이트  - 1인 프로젝트

## 목차

* 프로젝트 소개
    1. 프로젝트 설명
    2. 개발 환경
    3. 디렉터리 
    4. 주요 기능
* 동작 구조
* 마치며
    1. 프로젝트 보완사항
    2. 소감


## 프로젝트 소개
1. **프로젝트 설명**
    깔끔하고 직관적인 UI로 구성한 커뮤니티 사이트의 전반적인 기능을 구현한 프로젝트
 
2. **개발 환경**
    * Front<br>
        Bulma CSS, Javascript, nuxt.js, axios

    * Back<br>
        node.js / express.js, MySQL, AWS EC2
        
3. **디렉터리 구조**
    * layouts<br>
        애플리케이션의 레이아웃을 포함하는 디렉토리 (default, noleft)
        
    * components<br>
        애플리케이션에서 사용될 컴포넌트들을 포함하는 디렉토리 (Header, Footer, Leftmunu)
        
    * pages<br>
        애플리케이션의 view와 route를 포함하는 디렉토리
        
    * mixins<br>
        여러 컴포넌트 간에 공통으로 사용하고 있는 로직, 기능들을 재사용하는 js파일을 포함하는 디렉토리
        
    * assets<br>
        css를 포함한 디렉토리
        
    * static<br>
        logo 이미지와 favicon을 포함하는 정적 파일들을 포함하는 디렉토리
        
    * plugins<br>
        애플리케이션이 생성되기 전 자바스크립트 플러그인을 포함하는 디렉토리 (웹에디터,cookie 등 전역적인 구성요소 등록)
        
    * nuxt.config.js<br>
      Nuxt.js의 사용자 정의 설정을 포함하는 파일
      
    * package.json<br>
        애플리케이션의 의존성과 스크립트를 포함하는 파일 입니다.
     
3. **주요 기능**
    * 쿠키와 세션을 사용한 로그인 및 로그아웃
    * 조건별 정렬/조회 및 페이징
    * toast-ui Editor 라이브러리를 적용해 사용자 편의에 따른 글쓰기 및, multer 모듈을 사용한 이미지업로드
    * 추천/비추천
    * 즐겨찾기
    * 댓글 및 ip를 인식한 조회수 적용 
    * 글작성내역 조회,글수정/삭제 

## 동작 구조

![구조-001](https://user-images.githubusercontent.com/87694251/152490415-cea0d1f0-68e6-490b-91c5-4e173e9f7222.jpg)

