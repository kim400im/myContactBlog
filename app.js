const express = require('express')
const dbConnect = require('./config/dbConnect')
const errorhandler = require('./middlewares/errorhandler')
const path = require('path')
const app = express();
// const router = express.Router();
const port = 8888
const methodOverride = require('method-override')  // post를 put으로 바꾸는 모듈

app.set('view engine', "ejs");
app.set("views", "./views");

app.use(express.static("./public"))

app.use(methodOverride("_method"))

dbConnect()

app.use(express.json())
app.use(express.urlencoded({extended: true})); // 이거 두개가 있어야 폼에서 넘겨준 값을 해석할 수 있다.
// app.use(router);

app.use("/", require("./routes/loginRoutes"))
app.use("/contacts", require("./routes/contactRoutes"))



// app.get("/", (req,res)=>{
//     res.status(200);
//     // res.json({message: "Hello node!!"})
//     res.send("Hello node")
// })

// app.get("/test", (req, res, next) => {
//     const error = new Error("test error");
//     error.status = 401;
//     next(error);
// })

app.use(errorhandler)

// router
//     .route('/contacts')
//     .get((req, res) => {
//         res.status(200).send("Contacts page")
//     })
//     .post((req, res) => {
//         res.status(201).send("Create Contacts")
//     })


// router.get('/contacts', (req, res) => {
//     // res.sendFile(__dirname + '/assets/contacts.html')
//     res.status(200).send("Contacts Page")
// })

// router.post("/contacts", (req, res) => {
//     res.status(201).send("Contacts page")
// })

// router
//     .route('/contacts/:id')
//     .get((req, res) => {
//         res.status(200).send(`View Contact for ID: ${req.params.id}`)
//     })
//     .put((req, res) => {
//         res.status(200).send(`Update Contact for ID: ${req.params.id}`);
//     })
//     .delete((req, res) => {
//         res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
//     })

// router.get("/contacts/:id", (req, res) => {
//     res.status(200).send(`View Contact for ID: ${req.params.id}`);
// })

// router.put("/contacts/:id", (req, res) => {
//     res.status(200).send(`Update Contact for ID: ${req.params.id}`);
// })

// router.delete("/contacts/:id", (req, res) => {
//     res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
// })

app.listen(port, ()=>{
    console.log(`${port} is on server`)
})


// package.json을 수정해서 npm start를 치면 바로 서버가 실행되도록 한다.