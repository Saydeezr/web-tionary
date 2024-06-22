// function to login
const login = (event) => {
    event.preventDefault();

    // get login info from input 
    const username = document.querySelector('#user-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    //if fields are not filled out, send error
    if(!username || !password) {
        const errorMsg = document.querySelector('#error');
        errorMsg.textContent = "All fields are required";
        return;
    }

    if(username && password) {
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        })
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                console.log('Error during login');
            }
        })
        .then(data => {
            console.log("Data:", data)
            window.localStorage.setItem('data', JSON.stringify(data))
            document.location.replace('dashboard')
        });
    }
}

document.querySelector('.login-form').addEventListener('submit', login);
