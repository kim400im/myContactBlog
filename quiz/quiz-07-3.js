// '/' 경로로 GET 요청했을 때 사용자 정보(users)를 JSON 형태로 응답하는 미들웨어를 작성하세요.

const express = require('express')
const app = express()


const users = [
  { id: 1, name: "Kim" },
  { id: 2, name: "Lee" },
  { id: 3, name: "Park" },
];

app.get("/users", (req, res) => {
  res.json(users)
})

app.listen(3000, ()=>{
  console.log("3000 port on")
})