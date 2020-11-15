// C->Create
// R->Read
// U->Update
// D->Delete

fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(bookData => {
        console.log(bookData)
        
        bookData.forEach((element, key) => {
            const div = document.createElement('div')
            div.setAttribute('id', element.id)
            div.innerHTML +=  '<br>' + '<div id=title>' + element.title + '</div>' +  '<br>' 
            + '<div id=author>' + element.author + '</div>' + '<br>' 
            + '<div id = description> ' +  element.description + '</div>' + '<br>'
            const img = document.createElement('img')
            img.setAttribute('style', 'width:300px;height:300px')
            img.setAttribute('id', 'coverImage')
            img.src = element.coverImage;
            div.appendChild(img)
            div.innerHTML += '<br>' + '<button onclick="onEdit('+ element.id + ')" data-action="edit">Edit</button>' + '<button data-action="delete" onclick="onDelete(' + element.id + ')">Delete</button>'
            document.body.appendChild(div)
            document.addEventListener('click', (event) => {
                console.log(event)
                console.log(event.target.dataset.action == 'edit')
                if(event.target.dataset.action == 'edit') {
                    const form = document.createElement('form')
                    form.setAttribute('id', 'editForm')
                    form.innerHTML += '<input id=edit-title placeholder=' + element.title + '/>' +  '<br>' 
                    + '<input id=edit-author placeholder=' + `${element.author}` + '/>' + '<br>' 
                    + '<input id = edit-description placeholder=' +  element.description + '/>' + '<br>'
                    + '<input id = edit-coverImage placeholder=' +  element.coverImage + '/>' + '<br>'
                    + '<input type="submit" />'
                    form.addEventListener('submit', (event) => {
                        event.preventDefault()
                        console.log(document.getElementById('edit-title').value)
                        fetch('http://localhost:3000/books/' + element.id, {
                        method: 'PATCH',
                        body: JSON.stringify({
                            title: document.getElementById('edit-title').value,
                            author: document.getElementById('edit-author').value,
                            coverImage: document.getElementById('edit-coverImage').value,
                            description: document.getElementById('edit-description').value
                        }),
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(bookData => {
                        console.log(bookData)
                        location.reload()
                    })
                    .catch(error => console.log(error))
                    })
                    div.appendChild(form)
                }

            })
        })

        
        
    })


// fetch('http://localhost:3000/books')
//     .then(response => response.json())
//     .then(bookData => console.log(bookData))



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
})
.then(setTimeout(() => {
    location.reload()
},2000))
.catch(error => {
    document.getElementById('error').innerHTML = 'Error'
    setTimeout(() => {
        document.getElementById('error').hidden = 'Error'
    }, 2000);
})
}


// function onEdit(id) {
//     console.log(id)
//     const parentDiv = document.getElementById(id)
//     console.dir(parentDiv.children)
//     const parentDivChildren = parentDiv.children;

//     let title;
//     let author;
//     let description;
//     let coverImage;
    
//     for(let i = 0; i<= parentDivChildren.length - 1; i++) {
//         console.log(parentDivChildren[i])
//         console.log( parentDivChildren[i]['id'] == 'title' )
//         if(parentDivChildren[i]['id'] == 'title') {
//             console.log( parentDivChildren[i].innerHTML )
//             title = parentDivChildren[i].innerHTML;
//         }
//         if(parentDivChildren[i]['id'] == 'author') {
//             console.log( parentDivChildren[i].innerHTML )
//             author = parentDivChildren[i].innerHTML;
//         }
//         if(parentDivChildren[i]['id'] == 'description') {
//             console.log( parentDivChildren[i].innerHTML.trim() )
//             description = parentDivChildren[i].innerHTML.trim();
//             console.log(description)
//         }
//         if(parentDivChildren[i]['id'] == 'coverImage') {
//             console.log( parentDivChildren[i] )
//             coverImage = parentDivChildren[i].src;
//             console.log(coverImage)
//         }
//     }

//     const element = document.createElement('div')
//     element.innerHTML += '<input type="text" id="title" placeholder= ' + title + '/>'
//     + '<input type="text" id="author" placeholder= ' + author + '/>'
//     + '<input type="text" id="description" placeholder= ' + description + '/>'
//     + '<input type="text" id="coverImage" placeholder= ' + coverImage + '/>'
//     + '<input type="submit" value="Edit Book">'

//     element.addEventListener("submit", (event) => {
//         console.log(event)
//     })
//     parentDiv.appendChild(element)

    
    
    
// }

function onDelete(id) {
    console.log(id)
    // DELETE
    fetch('http://localhost:3000/books/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(response => response.json())
    .then(bookData => {
        console.log(bookData)
        location.reload()
    })
    .catch(error => console.log(error))
}