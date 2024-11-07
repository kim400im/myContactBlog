

const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt")
const User = require("../models/userModel")

require('dotenv').config()

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const getLogin = (req, res) => {
    res.render("home");
}

const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body;

    // if (username == "admin" && password == "1234"){
    //     res.send("Login Success");
    // }else {
    //     res.send("Login Failed");
    // }

    const user = await User.findOne({username});

    if(!user){
        return res.status(401).json({message: "일치하는 사용자 없음"});
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(401).json({message: "비밀번호 틀림"});
    }

    const token = jwt.sign({id:user._id}, jwtSecret);  // 사용자 아이디 기반으로 jwt 생성

    res.cookie("token", token, {httpOnly:true})   // 생성된 토큰을 쿠키에 저장. 쿠키는 브라우저에 저장함

    res.redirect("/contacts");
})

const getRegister = (req, res) => {
    res.render("register")
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, password2 } = req.body;

    if(password == password2){
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username, password: hashedPassword});

        res.status(201).json({message: "Register Scucess", user});
    }else{
        res.send("Register Failed")
    }
})

const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/")
}

module.exports = { getLogin, loginUser, getRegister, registerUser, logout }