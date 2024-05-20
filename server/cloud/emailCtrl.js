// SENDGRID
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_APIKEY)

// NODEMAILER
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "465",
    secure: true,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});
// EJS
const ejs = require('ejs');

exports.send = async (email, name, description, code) => {
    const render = await getRender(name, description, code)
    const _email = {
        to: email,
        subject: 'Resultado compra cupón',
        html: render,
    }
    let success = await sendBySendgrid(_email)
    console.log(success)
    if(!success) success = await sendByGmail(_email)
    return
}

const getRender = (name, description, code) => {
    return new Promise((res,rej) => {
        ejs.renderFile(__dirname + '/templates/coupon.ejs', { name, description, code}, async (err, data) => {
            if (err) console.log(err)
            res(data)
        })
    })
}
const sendBySendgrid = (email) => {
    email.from = process.env.SENDGRID_EMAIL
    return new Promise((res, rej) => {
        sgMail
            .send(email)
            .then(() => {
                res(true)
            })
            .catch((error) => {
                console.log("ERROR.sengrid", error)
                res(false)
            })
    })

}

const sendByGmail = (email) => {
    email.from = process.env.GMAIL_EMAIL
    return new Promise((res, rej) => {
        transporter.sendMail(email, (error, info) => {
            if (error) {
                res(false)
            } else {
                res(true)
            }
        }
        );
    })

}