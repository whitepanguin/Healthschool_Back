// 디렉토리 구조 및 순서
// 1. db: DBMS 연결 및 설정

// 2 ~ 6까지 반복
// 2. app.js(server.js): 서버 설정, 미들웨어 설정 및 라우터 설정
// 3. schemas: 스키마 정의
// 4. controllers: DB 접근 및 비지니스 로직 작성
// 5. routers: 요청한 경로에 맞는 controller를 실행하는 라우터 작성
// 6. utils: 중복되는 코드를 하나의 유틸 함수로 묶기
import express from 'express';
import bodyParser from 'body-parser'
import connect from './connect/connect.js'
import cors from 'cors';
import dotenv from 'dotenv';
import rootRouter from './routes/index.js';
import passport from 'passport';
import { initializePassport } from './auth/auth.js';

connect() // Mongoose 연결
dotenv.config() // dotenv 연결

const app = express()
const port = 8000;

// app.use() 미들웨어
app.use(bodyParser.json())

// 테스트용 모두 접근 허용
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/html; charset=utf-8")
  next()
})

// qs모듈을 사용하여 쿼리스트링으로 인식
app.use(express.urlencoded({extended : false}));
app.use(cors({
  origin : "*",
  method : ["GET", "POST", "DELETE", "PUT"],
  credentials : true,
}))

// passport 초기화 및 사용
app.use(passport.initialize())
initializePassport()

app.use("/", rootRouter)
app.listen(port)