const signup = (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(!username || !password) {
        const errorMsg = document.querySelector('#error');
        errorMsg.textContent = "All fields are required";
        return;
    }
    if(username && password) {
        console.log('sending request')
        fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        })
        .then(response => {
            console.log(response)
            if(response.ok){
                return response.json()
            } else {
                alert(response.statusText);
            }
        })
        .then(data => {
            console.log('Data', data)
            window.localStorage.setItem('data', JSON.stringify(data))
            document.location.replace('dashboard')
          })
}}

document.querySelector('.signupBtn').addEventListener('click', signup);