function readAllBlogs() {
    let parent = document.getElementById('allBlogs'), card, cardHeader, cardBody, img, title, content;
    if (localStorage.getItem('blogDB') === null) {
        localStorage.setItem('blogDB', JSON.stringify({ "blogs": [] }));
        parent.innerText = 'There is no blog yet!'
    } else {
        let blogs = JSON.parse(localStorage.getItem('blogDB')).blogs;
        // console.log(blogs.blogs);
        blogs.reverse().map(blog => {
            // create new elements
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

readAllBlogs();
$('.blogCards .card').click(BlogCliked())
