// ‘/users’ 경로로 요청할 때 사용자의 이름을 받아서
// ‘Hello, Kyunghee!’ 처럼 인사말을 반환하는 API를 작성해 보세요.

const express = require('express')

const app = express()

app.get('/users/:name', (req, res)=>{
    const name = req.params.name
    res.status(200).send(`Hello ${name}`);
})

app.listen(3000, (req, res)=>{
    console.log("port 3000 on")
})