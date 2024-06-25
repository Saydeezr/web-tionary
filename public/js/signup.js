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
                // return response.json()
                document.location.replace('/dashboard')
            } else {
                alert(response.statusText);
            }
        })
}};

document.querySelector('.signupForm').addEventListener('submit', signup);