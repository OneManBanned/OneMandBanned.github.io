import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

transporter.verify(function(err, success) {
    if (err) {
        console.error(err)
    } else {
        console.log("waiting to send emails")
    }
})

export default transporter

