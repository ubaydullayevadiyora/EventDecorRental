const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            host: config.get("smtp_host"),
            port: config.get("smtp_port"),
            secure: false,
            auth: {
                user: config.get("smtp_user"),
                pass: config.get("smtp_password")
            }
        });
    }

    async sendOtpMail(toEmail, otp) {
        await this.transporter.sendMail({
            from: config.get("smtp_user"),
            to: toEmail,
            subject: "Event Decor Rental OTP Tasdiqlash",
            text: `Sizning OTP kodingiz: ${otp}. Ushbu kod 3 daqiqa davomida amal qiladi.`,
            html: `<div><h1>Sizning OTP kodingiz: <strong>${otp}</strong></h1><p>Bu kod 3 daqiqa davomida amal qiladi.</p></div>`
        });
    }

}

module.exports = new MailService();