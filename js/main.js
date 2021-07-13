
if (localStorage.getItem('blogDB') === null) {
    localStorage.setItem('blogDB', JSON.stringify({ "blogs": [] }))
}

var a = JSON.parse(localStorage.getItem("blogDB") || '{}');
var currentBlogs = a.blogs;
console.log(a.blogs);


function createNewBlog() {
    var blogTitle = document.getElementById('blogTitle').value
    var blogContent = document.getElementById('blogContent').value
    var blogImg = document.getElementById('blogImg').value
    // console.log("object " + blogImg + ' ' + blogContent);
    $('#newBlogForm').modal('hide')
    newBlog(blogTitle, blogContent, blogImg);

}

function newBlog(blogTitle, blogContent, blogImg) {
    var newBlogObj = {
        id: a.blogs.length + 1,
        title: blogTitle,
        content: blogContent,
        image: blogImg
    }
    currentBlogs.push(newBlogObj);
    localStorage.setItem('blogDB', JSON.stringify({ "blogs": currentBlogs }))
    createNewBlogDOM(newBlogObj.id, blogTitle, blogContent, blogImg)

}

function createNewBlogDOM(blogId, blogTitle, blogContent, blogImg) {
    var parent = document.getElementById('blogCards');
    var card = document.createElement('div').classList.add("card");
    var card_header = document.createElement('div').classList.add("card-header");;
    parent.append(card)
    card.append(card_header)
    console.log("hnjmkl");
}
