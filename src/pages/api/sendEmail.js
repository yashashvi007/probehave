const nodemailer = require('nodemailer');


export default async function handler(
  req,
  res
) {
  console.log(req.body.email);
  try {
    const transport = nodemailer.createTransport({
      host : "smtp.hostinger.com",
      port : 465,
      auth : {
        user : "yashashvi.maurya@werbooz.com" ,
        pass : "Yashashvi@1234"
      }
    })
  
  
    const mailOptions = {
      from :"yashashvi.maurya@werbooz.com" ,
      to : req.body.email, 
      subject : "Subject" , 
      text : `otp is ${req.body.otp.otp}` 
    }
  
    await transport.sendMail(mailOptions)
  
    res.status(200).json({ message : "sucess" })
  } catch (error) {
    console.log(error);
  }
}
