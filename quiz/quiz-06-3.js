// " /" 경로로 접속하면 "Welcome"을 표시하고
// "/about" 경로로 접속하면 "This is the about page."라는 텍스트를 표시하는 라우트를 작성하세요.

const express =require('express')
const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Welcome")
})

app.get('/about', (req, res)=>{
    res.status(200).send("This is the about page");
})

app.listen(3000, ()=>{
    console.log("port open 3000")
})