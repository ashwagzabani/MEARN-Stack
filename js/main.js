function createNewBlog() {
    var blogTitle = document.getElementById('blogTitle').value;
    var blogContent = document.getElementById('blogContent').value;

    $('#newBlogForm').modal('hide')
    newBlog(blogTitle, blogContent);
    // console.log(JSON.parse(localStorage.getItem("blogDB")));


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
    var a = JSON.parse(localStorage.getItem("blogDB") || '{}');
    var currentBlogs = a.blogs;
    var id;
    if (a.blogs.length === 0) {
        id = 0
    } else {
        id = a.blogs.length + 1
    }
    var newBlogObj = {
        id: id,
        title: blogTitle,
        content: blogContent,
        image: localStorage.getItem('tempImgUrl')
    }
    currentBlogs.push(newBlogObj);
    localStorage.setItem('blogDB', JSON.stringify({ "blogs": currentBlogs }))
    // console.log(localStorage.getItem('newBlogObj'));
    createNewBlogDOM(newBlogObj.id, blogTitle, blogContent, newBlogObj.image)

}


function createNewBlogDOM(blogId, blogTitle, blogContent, blogImg) {
    let parent = document.getElementById('blogCards');
    let card = document.createElement('div');
    let cardHeader = document.createElement('div');
    let cardBody = document.createElement('div');
    let img = document.createElement('img');
    let title = document.createElement('h5');
    let content = document.createElement('p');

    card.className = 'card';
    card.id = blogId;
    card.setAttribute("data-toggle", "modal");
    card.setAttribute("data-target", "#displayBlog");
    cardHeader.className = 'card-header';
    cardBody.className = 'card-body';
    img.className = "cardImage";

    img.src = blogImg;
    title.innerText = blogTitle;
    content.innerText = blogContent;

    cardBody.appendChild(title);
    cardBody.appendChild(content);
    cardHeader.appendChild(img);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    parent.prepend(card);
    // console.log("done");

    document.getElementById("blogTitle").value = ""
    document.getElementById("blogContent").value = ""
    document.getElementById("blogImg").value = ""

    card.onclick = displayBlog([{
        id: blogId,
        title: blogTitle,
        content: blogContent,
        image: blogImg
    }]);

    // console.log($('#blogId'));
}

function readRecentBlogs() {
    let parent = document.getElementById('blogCards'), card, cardHeader, cardBody, img, title, content;

    if (localStorage.getItem('blogDB') === null) {
        localStorage.setItem('blogDB', JSON.stringify({ "blogs": [] }));
        parent.innerText = 'There is no blog yet!'
    } else {
        let blogs = JSON.parse(localStorage.getItem('blogDB')).blogs.reverse().slice(0, 3);
        // console.log(blogs.blogs);
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
            card.setAttribute("data-toggle", "modal");
            card.setAttribute("data-target", "#displayBlog");
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

            // card.onclick = displayBlog();
            // console.log("done");
        })
    }
}

function BlogCliked() {
    const cardZone = $('.blogCards .card')
    let currentCardZoneId;
    cardZone.click(function () {
        currentCardZoneId = event.target.parentNode;
        if (currentCardZoneId.className === 'card') {
            // console.log(currentCardZoneId.id);
            let currentBlog = getBlogById(currentCardZoneId.id);
            displayBlog(currentBlog)
        } else {
            // console.log(currentCardZoneId.parentNode.id);
            let currentBlog = getBlogById(currentCardZoneId.parentNode.id)
            displayBlog(currentBlog)
        }
    })
}

function getBlogById(blogId) {
    // console.log(blogId);
    let blogs = JSON.parse(localStorage.getItem('blogDB')).blogs;
    let currentBlog = blogs.filter(blog => blog.id == blogId);

    // console.log(blogs);
    // console.log(currentBlog);
    // console.log("object");
    return currentBlog;

}

function displayBlog(blog) {
    document.getElementById('displayBlogTitle').innerText = blog[0].title;
    document.getElementById('displayBlogImg').src = blog[0].image;
    document.getElementById('displayBlogContent').innerText = blog[0].content;

}

readRecentBlogs();
// BlogCliked();
$('.blogCards .card').click(BlogCliked())
// console.log(JSON.parse(localStorage.getItem("blogDB")));
