const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // must be false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
  tls: {
    rejectUnauthorized: false
  }
});

// verify connection (very useful for Render logs)
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready");
  }
});

const sendOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Fabrico" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Registration or Forgot password",
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};

module.exports = { sendOtpEmail, transporter };