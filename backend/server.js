require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// Email transporter
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	}
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
	try {
		const { name, email, message } = req.body;

		// Email content
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: `${process.env.EMAIL_TO}, ${process.env.EMAIL_TO_SECOND}`,
			subject: `New Contact Form Submission from ${name}`,
			text: `
				Name: ${name}
				Email: ${email}
				Message: ${message}
			`
		};

		// Send email
		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: 'Message sent successfully' });
	} catch (error) {
		console.error('Error sending email:', error);
		res.status(500).json({ error: 'Failed to send message' });
	}
});

// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});