// m v c
// c 가 컨트롤러 v 가 view m 이 모델 
const asyncHandler = require('express-async-handler')
const Contact = require("../models/contactModel")
// const path = require("path");

// const getAllContacts = async (req, res) => {
//     try {
//         res.status(200).send("Contacts page")
//     } catch(error){
//         res.send(error.message);
//     }
// }

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    // res.status(200).send("<h1 style='color:green'>Contacts Page</h1>")
    // const filePath = path.join(__dirname, "../assets", "getAll.html");
    // res.sendFile(filePath)
    // const users = [
    //     {name:"John", email:"john@aaa.bbb", phone:"12345"},
    //     {name:"Jane", email:"jane@bbb.aaa", phone:"34566"},
    // ];

    // res.render("getAll", {heading: "User List", users: users});
    res.render("index", {contacts : contacts})
    // contacts 변수를 index.ejs에 넘긴다.
})

const addContactForm = (req, res) => {
    res.render("add");
}

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    
    const {name, email, phone} = req.body;
    
    if (!name || !email || !phone){
        return res.status(400).send('필수값이 없음')
    }

    try {
        const contact = await Contact.create({
            name,
            email,
            phone,
        });
        // res.status(201).json(contact);  // 생성된 연락처 정보를 응답으로 보냄
        // res.status(201).send("create contacts")
        res.redirect("/contacts")
    } catch (error) {
        console.error('연락처 생성 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류', error: error.message });
    }
});

const getContact = asyncHandler(async (req, res) => {
    const contact =await Contact.findById(req.params.id)
    // const name = req.params.id;
    // const contact = await Contact.findOne({name: name});
    // res.status(200).send(contact);
    res.render("update", {contact: contact});
});

const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {name, email, phone} = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {name, email, phone},
        {new: true}
    );
    //res.status(200).send(updatedContact);
    res.redirect("/contacts");
    // const contact =await Contact.findById(id);
    // if (!contact){
    //     res.status(404);
    //     throw new Error("Contact not found")
    // }
    // contact.name = name;
    // contact.email = email;
    // contact.phone = phone;

    // contact.save();

    // res.status(200).json(contact);
    // res.status(200).send(`Update Contact for ID: ${req.params.id}`);
})

const deleteContact =asyncHandler(async (req, res) => {
    // const contact =await Contact.findById(req.params.id);
    // if(!contact){
    //     res.status(404);
    //     throw new Error("Contact not found")
    // }
    // await Contact.deleteOne();
    // res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/contacts')
})

module.exports = {getAllContacts, createContact, getContact, updateContact, deleteContact, addContactForm}