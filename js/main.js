
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

    createNewBlogDOM(newBlogObj.id, blogTitle, blogContent, newBlogObj.image)

}


function createNewBlogDOM(blogId, blogTitle, blogContent, blogImg) {
    let parent = document.getElementById('blogCards');

    let card = document.createElement('div');
    card.className = 'card';
    card.id = blogId;

    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let img = document.createElement('img');
    img.className = "cardImage";
    img.src = blogImg;


    let title = document.createElement('h5');
    title.innerText = blogTitle;

    let content = document.createElement('p');
    content.innerText = blogContent;

    cardBody.appendChild(title);
    cardBody.appendChild(content);
    cardHeader.appendChild(img);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    parent.appendChild(card);
    console.log("done");

    document.getElementById("blogTitle").value = ""
    document.getElementById("blogContent").value = ""
    document.getElementById("blogImg").value = ""
}

function readAllBlogs() {
    let parent = document.getElementById('blogCards'), card, cardHeader, cardBody, img, title, content;

    if (localStorage.getItem('blogDB') === null) {
        localStorage.setItem('blogDB', JSON.stringify({ "blogs": [] }));
        parent.innerText = 'There is no blog yet!'
    } else {
        let blogs = JSON.parse(localStorage.getItem('blogDB')).blogs;
        console.log(blogs.blogs);
        blogs.map(blog => {
            // create new elements
            parent = document.getElementById('blogCards');
            card = document.createElement('div');
            cardHeader = document.createElement('div');
            cardBody = document.createElement('div');
            img = document.createElement('img');
            title = document.createElement('h5');
            content = document.createElement('p');

            //add classes for the elements
            card.className = 'card';
            cardHeader.className = 'card-header';
            cardBody.className = 'card-body';
            img.className = "cardImage";

            //assign the values to the elements
            card.id = blog.id;
            img.src = blog.image;
            title.innerText = blog.title;
            content.innerText = blog.content;

            //append the elements to the html
            cardBody.appendChild(title);
            cardBody.appendChild(content);
            cardHeader.appendChild(img);
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            parent.appendChild(card);

            console.log("done");
        })
    }
}

readAllBlogs();
