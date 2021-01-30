import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string){
    // let testAccount = await nodemailer.createTestAccount();
    // console.log('test account', testAccount);

    let transporter = nodemailer.createTransport({
        host: 'stmp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'wjh3igdjyqd3mhi3@ethereal.email',
            pass: 'MbeCzemQYGB7tGHxJS'
        }
    });

    let info = await transporter.sendMail({
        from: '"Music Hub" <musichub@email.com>',
        to,
        subject: 'Change password',
        html
    });
    
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}