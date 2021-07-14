
if (localStorage.getItem('blogDB') === null) {
    localStorage.setItem('blogDB', JSON.stringify({ "blogs": [] }))
}

var a = JSON.parse(localStorage.getItem("blogDB") || '{}');
var currentBlogs = a.blogs;
console.log(a.blogs);


function createNewBlog() {
    var blogTitle = document.getElementById('blogTitle').value;
    var blogContent = document.getElementById('blogContent').value;

    $('#newBlogForm').modal('hide')
    newBlog(blogTitle, blogContent);

}

// convert file to a base64 url
const readURL = file => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};

const onFileSelected = async event => {
    const file = event.target.files[0];
    const url = await readURL(file);
    localStorage.setItem('tempImgUrl', url)
    return url;

};

function newBlog(blogTitle, blogContent) {
    var newBlogObj = {
        id: a.blogs.length + 1,
        title: blogTitle,
        content: blogContent,
        image: localStorage.getItem('tempImgUrl')
    }
    currentBlogs.push(newBlogObj);
    localStorage.setItem('blogDB', JSON.stringify({ "blogs": currentBlogs }))

    createNewBlogDOM(newBlogObj.id, blogTitle, blogContent, blogImg)

}


function createNewBlogDOM(blogId, blogTitle, blogContent) {
    var parent = document.getElementById('blogCards');
    let card = document.createElement('div');
    card.className = 'card';

    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let img = document.createElement('img');
    img.src = localStorage.getItem('tempImgUrl');


    let title = document.createElement('h5');
    title.innerText = "task.title";
    title.className = 'card-title';


    cardBody.appendChild(title);
    cardHeader.appendChild(img);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    parent.appendChild(card);
    console.log("hnjmkl");
}
