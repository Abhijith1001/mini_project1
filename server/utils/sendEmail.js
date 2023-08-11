const nodemailer = require("nodemailer")


module.exports = async(email,subject,text)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            post:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:"abhijiithb@gmail.com",
                pass:"lthjkqzvgkdkdoky"
            }
        })

        await transporter.sendMail({
            from:"abhijiithb@gmail.com",
            to:email,
            subject:subject,
            text:text
        })
        console.log("Email sent");
    } catch (error) {
        console.log("Email not sent");
        console.log(error);
        
    }
}