// document.getElementById('submitBtn').addEventListener('click', () => {
//     const code = document.getElementById('codeInput').value;

//     // Simulating an API request to ChatGPT backend (can be replaced with actual API)
//     fetch('https://api.your-ai-backend.com/review', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ code: code })
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Display the review results
//         document.getElementById('comments').innerHTML = `<strong>Comments:</strong><br>${data.comments}`;
//         document.getElementById('grade').innerHTML = `<strong>Grade:</strong> ${data.grade} (${data.score}/10)`;

//         // Unhide the results section
//         document.getElementById('results').classList.remove('hidden');
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });



document.getElementById('submitBtn').addEventListener('click', () => {
    const code = document.getElementById('codeInput').value;

    // Update the URL to point to your local server
    fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        // Display the review results
        document.getElementById('comments').innerHTML = `<strong>Comments:</strong><br>${data.comments}`;
        document.getElementById('grade').innerHTML = `<strong>Grade:</strong> ${data.grade} (${data.score}/10)`;

        // Unhide the results section
        document.getElementById('results').classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
