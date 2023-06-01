const nodemailer = require("nodemailer");
const path = require('path');

const send = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'projectacl4@gmail.com',
				pass: 'foahtedasjlxppem',

			},
		});
		

		await transporter.sendMail({
			from: 'projectacl4@gmail.com',
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

const sendWithAttach = async (email, subject, text,file) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'projectacl4@gmail.com',
				pass: 'foahtedasjlxppem',

			},
		});
		

		await transporter.sendMail({
			from: 'projectacl4@gmail.com',
			to: email,
			subject: subject,
			text: text,
			attachments: [
				{
					filename: file, 
					path: path.join(__dirname, `../certificates/${file}`), 
					contentType: 'application/pdf'
				}
			]
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

module.exports={send,sendWithAttach}