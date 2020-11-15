// C->Create
// R->Read
// U->Update
// D->Delete


// fetch('http://localhost:3000/books')
//     .then(response => response.json())
//     .then(bookData => console.log(bookData))

fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(bookData => console.log(bookData))

// POST
// fetch('http://localhost:3000/books', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'Harry Potter',
//         author: 'J.k. Rowling',
//         coverImage: 'https://cdn.pocket-lint.com/r/s/1200x630/assets/images/150401-tv-feature-harry-potter-image1-vpdnsqfrou.jpg',
//         description: 'A Harry Potter novel by J.K. Rowling'
//     }),
//     headers: {
//         'Content-Type' : 'application/json'
//     }
// }).then(response => response.json())
// .then(bookData => console.log(bookData))

// PATCH
// fetch('http://localhost:3000/books/4', {
//     method: 'PATCH',
//     body: JSON.stringify({
//         title: 'Jingles',
//         author: 'Kayne West',
//         coverImage: 'https://cdn.pocket-lint.com/r/s/1200x630/assets/images/150401-tv-feature-harry-potter-image1-vpdnsqfrou.jpg',
//         description: 'A Jingles novel by Kayne West'
//     }),
//     headers: {
//         'Content-Type' : 'application/json'
//     }
// }).then(response => response.json())
// .then(bookData => console.log(bookData))
// .catch(error => console.log(error))

// DELETE
// fetch('http://localhost:3000/books/4', {
//     method: 'DELETE',
//     headers: {
//         'Content-Type' : 'application/json'
//     }
// }).then(response => response.json())

function onSubmit() {
    console.log(document.getElementById('title').value)
    console.log(document.getElementById('author').value)
    console.log(document.getElementById('coverImage').value)
    console.log(document.getElementById('description').value)

    fetch('http://localhost:3000/books', {
    method: 'POST',
    body: JSON.stringify({
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        coverImage: document.getElementById('coverImage').value,
        description: document.getElementById('description').value
    }),
    headers: {
        'Content-Type' : 'application/json'
    }
}).then(response => response.json())
.then(bookData => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('coverImage').value = '';
    document.getElementById('description').value = '';
    document.getElementById('success').innerHTML = 'Success'
    setTimeout(() => {
        document.getElementById('success').hidden = true;
    }, 2000);
})
.catch(error => {
    document.getElementById('error').innerHTML = 'Error'
    setTimeout(() => {
        document.getElementById('error').hidden = 'Error'
    }, 2000);
})
}