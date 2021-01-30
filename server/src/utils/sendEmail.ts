import nodemailer from 'nodemailer';

export async function sendEmail(to: string, html: string){
    // let testAccount = await nodemailer.createTestAccount();
    // console.log('test account', testAccount);

    let transporter =  nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {          
            user: 'bj6n4xfymxhxwem2@ethereal.email', 
            pass: 'hyuFdKEGYUvrJtn3Z4'
        }
    });

    try{
        let info = await transporter.sendMail({
            from: '"Music Hub" <musichub@email.com>',
            to,
            subject: 'Change password',
            html
        });
    
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
         console.log(err)
    }
}