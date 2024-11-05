console.log('se ejecuta el js');
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'ventas.html';  
        }else {
            messageElement.textContent = 'Usuario o password incorrecto'
          }
          
        return response.json();
    })
    .catch(error => {
        showMessage('Error en la conexión.', 'alert-danger');
        console.error('Error:', error);
    });
  });