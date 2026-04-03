import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
 

const otpgenrate = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
    }
    catch (error) {
        console.error(`Failed to send OTP email to ${email}:`, error.message);
    }
};

export { otpgenrate, sendOTPEmail };