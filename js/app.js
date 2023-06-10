function setOption(optionsSelector) {
  if(!isTheOptionValid(optionsSelector.val())) return;

  consumeAPI(optionsSelector.val());
}

function isTheOptionValid(selectedOption) {
  return ["posts", "comments", "photos"].includes(selectedOption);
}

function consumeAPI(resource) {
  const baseUrl = "https://jsonplaceholder.typicode.com/";

  $.ajax({url: baseUrl + resource}).done(response => showContent(response, resource))
}

function showContent(content, type) {
  const contentContainer = $("#content");
  clearContent(contentContainer)

  if(type == "posts") {
    printPosts(content, contentContainer);
  } else if(type == "comments") {
    printComments(content, contentContainer);
  } else if(type == "photos") {
    printPhotos(content, contentContainer);
  }
}

function clearContent(content) {
  content.html("");
}

function printPosts(posts, container) {
  posts.forEach(post => {
    container.html(container.html() + `
      <div class="card mb-2" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
        </div>
      </div>
    `)
  });
}

function printComments(comments, container) {
  comments.forEach(comment => {
    container.html(container.html() + `
      <div class="card" style="width: 100%;">
        <div >
          <img src="img/generic_avatar.jpg" class="card-img-top user-photo" alt="..." style="width: 80px; height: 80px; border-radius: 50%; margin-right: 10px;">
          <h2 style="display: inline; vertical-align: middle;">${comment.name}</h2>
        </div>
        <div class="card-body">
          <p class="card-text">${comment.body}</p>
          <img class="icon" src="img/email_icon.png" alt=""> <a href="mailto:Eliseo@gardner.biz">${comment.email}</a>
          <img class="icon" src="img/like_icon.png" alt=""> <span class="icon-text">0</span>
          <img class="icon" src="img/dislike_icon.png" alt=""> <span class="icon-text">0</span>
        </div>
      </div>
    `)
  });
}

function printPhotos(photos, container) {
  photos.forEach(photo => {
    container.html(container.html() + `
      <div class="card" style="width: 18rem;">
        <img src="${photo.thumbnailUrl}" class="card-img-top" alt="...">
      </div>
    `)
  });
}
