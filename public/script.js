const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    menu.classList.toggle('active');
}

// Function to handle form submission via AJAX
function submitForm() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    console.log('Submitting form with data:');
    console.log('Full Name:', formData.get('fullname'));
    console.log('Email:', formData.get('email'));
    console.log('Message:', formData.get('message'));

    fetch('/contact', {
        method: 'POST',
        body: JSON.stringify({
            fullname: formData.get('fullname'),
            email: formData.get('email'),
            message: formData.get('message')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        console.log('Form submission response:', data);
        alert(data); // Display success message
        form.reset(); // Clear the form
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form.');
    });
}

// Attach the submitForm function to the form's submit event
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    submitForm(); // Call the submitForm function
});