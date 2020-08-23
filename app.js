if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index.ejs', {message: false})
})

app.post('/sendEmail', async (req, res) => {
    let sendData = JSON.parse(Object.keys(req.body));
    let email = await sendEmail(sendData.email, sendData.name, sendData.phone, sendData.message);
    res.render('index.ejs', {message: true})
})

async function sendEmail(emailAddress, name, phoneNumber, message){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: 'My Personal Website',
        to: emailAddress,
        subject: 'Message from my personal website',
        text: `Hello Yukesh,
        Name: ${name}
        phoneNumber: ${phoneNumber}
        message: ${message}`
    } 

    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error)
        } else{
            console.log("Email sent: " + info.response);
        }
    })
}
app.listen(process.env.PORT || 3000, ()=> {
    console.log("Server has been started!")
})