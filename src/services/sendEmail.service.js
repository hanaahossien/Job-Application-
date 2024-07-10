

import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail'
        , auth: {
            user: "hanaa.hossien88@gmail.com",
            pass: "ozmldpmasjysktcv",
        },
    });

    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <hanaa.hossien88@gmail.com>', // sender address
        to: to ? to : "",
        subject: subject ? subject : "hi",
        html: html ? html : "hello",
    });

    console.log( info);
}

