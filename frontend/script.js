document.getElementById('contactForm').addEventListener('submit', async (e) => {
	e.preventDefault();
	const formData = new FormData(e.target);
	const messageDiv = document.getElementById('formMessage');
	
	try {
		const response = await fetch('http://localhost:3000/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: formData.get('name'),
				email: formData.get('email'),
				message: formData.get('message')
			})
		});

		const data = await response.json();
		
		if (response.ok) {
			messageDiv.textContent = 'Message sent successfully!';
			messageDiv.className = 'form-message success';
			e.target.reset();
		} else {
			throw new Error(data.error || 'Failed to send message');
		}
	} catch (error) {
		messageDiv.textContent = error.message;
		messageDiv.className = 'form-message error';
	}
});