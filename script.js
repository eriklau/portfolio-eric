const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  menu.classList.toggle('active');
}

function submitForm() {
  const form = document.getElementById('contact-form');
  const formData = new FormData(form);

  console.log('Submitting form with data:');
  console.log('Full Name:', formData.get('fullname'));
  console.log('Email:', formData.get('email'));
  console.log('Message:', formData.get('message'));

  fetch('https://website-eric.onrender.com/contact', {
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
    alert(data);
    form.reset();
  })
  .catch(error => {
    console.error('Error submitting form:', error);
    alert('There was an error submitting the form.');
  });
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});