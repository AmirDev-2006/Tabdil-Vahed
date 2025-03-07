const data = {
    username: 'john_doe',
    email: 'john.doe@example.com'
};


fetch('https://unitconverter.liara.run/api/convert/', {
    method: 'POST', // Specify the method as POST
    headers: {
        'Content-Type': 'application/json' // Specify the content type as JSON
    },
    body: JSON.stringify(data) // Convert the JavaScript object to JSON
})
.then(response => response.json()) // Parse the JSON response from the server
.then(data => {
    console.log('Success:', data); // Handle the server response
})
.catch((error) => {
    console.error('Error:', error); // Handle any errors
});
