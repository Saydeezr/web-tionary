const createPost = (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const message = document.querySelector('#content').value.trim();

    if(!title || !message) {
        const errorMsg = document.querySelector('.error');
        errorMsg.textContent = "All fields are required";   
        return;
    }
    if(title && message) {
        fetch('api/blogs/', {
            method: 'POST',
            body: JSON.stringify({ title, message }),
            headers: { 'Content-Type': 'application/json'},
        })
        .then(response => {
            if(response.ok){
                response.json().then(data => {
                    console.log('Blog created:', data)
                    displayBlog();
                })
            } else {
                alert(response.statusText);
            }
        })
}};


function displayBlog() {
    fetch('/api/blogs/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }) 
    .then(response => {
        if(response.ok){
            response.json().then(data => {
             const container = document.querySelector('.blog-container');
             data.forEach(data => {
               const title = document.createElement('h2');
               title.textContent = data.title;
   
               const message = document.createElement('p');
               message.textContent = data.message;
   
               const date = document.createElement('p');
               date.textContent = 'created on:' + ' ' + data.date_created;
   
               container.append(title);
               container.append(message);
               container.append(date);
         })
        })}
    })
};

document.querySelector('#postForm').addEventListener('submit', createPost);