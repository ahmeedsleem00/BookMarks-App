var nameInput = document.getElementById("name")
var urlInput = document.getElementById("url")
var addBnt  = document.getElementById("addBtn")

var tableBody= document.getElementById("tableBody")
var bookMarks =[];
var mainindex = 0;


if(localStorage.getItem("bookMarks") == null){
    bookMarks=[]
}else{
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"))
    displayBook(bookMarks)

}
addBnt.onclick = function(){
    if(addBnt.innerHTML == "Update"){
        addBnt.innerHTML  = "Submit"
          
        var bookMark = {
            name: nameInput.value,
            url: urlInput.value,
        }    
        bookMarks.splice(mainindex,1,bookMark)
         
    }else{
        
        
        var bookMark = {
            name: nameInput.value,
            url: urlInput.value,
        }
        bookMarks.push(bookMark);

    }
    // console.log(bookMarks);
    localStorage.setItem("bookMarks" ,JSON.stringify(bookMarks))
    displayBook(bookMarks);
    clearData();
    
} 


function displayBook(anyArray){

    var marks= ``;
    for(var i = 0; i < anyArray.length ; i++){
        marks +=`
        <tr>
        <td>${anyArray[i].name}</td>
        <td> 
        <a href="${anyArray[i].url}">
        <button class="btn btn-primary">
        Visit
        </button>
        </a>
</td>
        <td> <button onclick="updateBook(${i})"class="btn btn-info">Update</button></td>
        <td> <button onclick="deleteBook(${i})"class="btn btn-danger">Delete</button></td>


        </tr>

        `
    }
    tableBody.innerHTML = marks
}

function deleteBook(index){
    bookMarks.splice(index,1)
    localStorage.setItem("bookMarks" ,JSON.stringify(bookMarks))
    displayBook(bookMarks)
}

function clearData(){

    nameInput.value = ""
    urlInput.value = ""
}

function updateBook(index){
    nameInput.value = bookMarks[index].name
    urlInput.value = bookMarks[index].url
    addBnt.innerHTML = "Update";
    mainindex = index
}


function search(term){
    wantedBook = []
    for(var i =0 ; i < bookMarks.length ; i++){
        if(bookMarks[i].name.toLowerCase().includes(term)){

            wantedBook.push(bookMarks[i])
        } 
    }

    displayBook(wantedBook)



}