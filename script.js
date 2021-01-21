
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const category = document.querySelector('#category');
const addPost = document.querySelector('.add-post');
const svButton = document.querySelector('.save-button');
const cancelButton = document.querySelector('.cancel-button');
const addButton = document.querySelector('.add-button');
const rowCards = document.querySelector('.row-card');
const daftarData = document.querySelector('.daftar-data');
const isiData = document.querySelector('.isi-data');


//Menampilkan data Author
//Get Author
fetch(`https://frozen-shore-65267.herokuapp.com/author/`)
.then( result => result.json())
.then( result => updateUISelectAuthor(result))

//Menampilkan data Author
//Get Category
fetch(`https://frozen-shore-65267.herokuapp.com/category/`)
.then( result => result.json())
.then( result => updateUISelectCategory(result))

// Menampilkan data
//GET
fetch('https://frozen-shore-65267.herokuapp.com/book/')
.then( result => result.json())
.then( result => updateUICard(result))


//Button di Card
//DETELE
//POST
rowCards.addEventListener('click', function(e){
    e.preventDefault();

    const dataId = e.target.parentElement.dataset.id;

    let delButtonPress = e.target.classList.contains('delete-post');
    let editButtonPress = e.target.classList.contains('edit-post');

    //Edit / PATCH
    if ( editButtonPress ) {
        const parent = e.target.parentElement;

       addButton.classList.add('hidden');
       svButton.classList.remove('hidden');
       cancelButton.classList.remove('hidden');
        
       let titleData = parent.querySelector('.title').textContent;
       let authorData = parent.querySelector('.author').textContent;
       let categoryData = parent.querySelector('.category').textContent;

       title.value = titleData;
       author.value = authorData;
       category.value = categoryData;
       


    }
    // Delete
    if (delButtonPress) {

        fetch(`https://frozen-shore-65267.herokuapp.com/book/${dataId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then( result => location.reload())
        .catch( err => console.log(err))
    }


    //Jika diklik Save
    svButton.addEventListener('click', function(e){
        e.preventDefault();
        

        fetch(`https://frozen-shore-65267.herokuapp.com/book/${dataId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title.value,
                author: author.value,
                category: category.value
            })
        })
        .then( res => location.reload() )
        .catch( err => console.log(err))


        addButton.classList.remove('hidden');
        svButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
    })

    //Jika dicancel
    cancelButton.addEventListener('click', function(){

        title.value = '';
        author.value = '';
        category.value = '';

        addButton.classList.remove('hidden');
        svButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
    })

});

//Menambah data
//POST
addButton.addEventListener('click', function(e){
    e.preventDefault();
    

    fetch('https://frozen-shore-65267.herokuapp.com/book/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            title: title.value,
            author: author.value,
            category: category.value
        })
    })
    .then(res => location.reload())
    .catch( err => console.log(err))
    
    title.value = '';
    author.value = '';
    category.value = '';
});


//  ===================================================================
// UPDATE UI

function updateUISelectAuthor(data){
    selectsAuthor = '';

    data.forEach( element => {
        selectsAuthor += templateSelectAuthor(element);
    })

    author.innerHTML = selectsAuthor;
}

function updateUISelectCategory(data){
    selectsCategory = '';

    data.forEach( element => {
        selectsCategory += templateSelectCategory(element);
    })

    category.innerHTML = selectsCategory;
}


function updateUICard(data){
    cards = '';
    
        data.forEach( element => {
            cards += templateCard(element);
        })
    
    daftarData.innerHTML = `Data ( ${data.length} )`;
    rowCards.innerHTML = cards;


}



// ==================================================
// Template Card
function templateSelectAuthor(element){
    return `<option value="${element.id}">${element.author}</option>`
}

function templateSelectCategory(element){
    return `<option value="${element.id}">${element.category}</option>`
}

function templateCard(element){
    return `<div class="col-md-4 mt-4 my-3">
                <div class="card">
                    <div class="card-body" data-id='${element.id}'>
                    <h5 class="card-title title">${element.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted author">${element.author}</h6>
                    <p class="card-text badge bg-secondary category">${element.category}</p> <br>
                    <a href="#" class="card-link btn btn-primary edit-post">Edit</a>
                    <a href="#" class="btn btn-secondary delete-post">Delete</a>

                    </div>
                </div>
            </div>`;
}




