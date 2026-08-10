import nodemailer from "nodemailer";

export const sendEmail = async(to, subject, text) => {
  try{
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };
    await transporter.sendMail(mailOptions);
  }
  catch(error){
    console.log("error in sending mail", error);
    throw new Error(`error while sending mail, ${error}`);
  }
}