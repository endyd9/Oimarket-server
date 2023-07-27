# Oimarket_Back-end(Express.js)

### Host URL : `https://oi-market.fly.dev`(No Views API Only)

## API명세

### root
GET`/` "메인페이지 상품 리스트"✅  
GET`/search?keyword=${keyword}` "검색결과 반환"✅  
POST`/join` "회원가입 요청"✅  
GET`/join/idcheck` "아이디 중복확인"✅  
POST`/login` "로그인 요청"✅  

### item
POST`/upload` "상품 업로드 요청"✅
GET`/:id` "상품 정보 요청"✅  
DELETE`/:id` "상품 삭제 요청"✅  
PATCH`/:id` "상품 수정 요청"✅  
PUT`/:id` "상품 상태 변경"✅ 
PATCH`/:id/count` "조회수 업"✅  

### user
GET`/:id` "마이페이지 데이터 요청"✅  
GET`/:id/edit` "회원 정보 요청"✅  
PATCH`/:id/edit` "유저 정보 수정"✅  
PATCH`/:id/pwdcheck` "비밀번호 변경 요청"✅  

### message
GET`/:id` "유저가 가진 채팅방 목록"  
POST`/:id` "채팅방 생성"     


## 사용기술
Language: `JavaScript(Node.js@20.4.0)`  
Server: `ExpressJS @4.18.2`  
DB: `mongoose@7.1.1`  
#### Deploy
Server: `Fly.io`  
DB: `Mongo Atlas`  
Storage: `AWS S3`  
