const contentContainer = $("#content");

function setOption(optionsSelector) {
  if(!isTheOptionValid(optionsSelector.val())) return;

  consumeAPI(optionsSelector.val());
}

function isTheOptionValid(selectedOption) {
  return ["posts", "comments", "photos"].includes(selectedOption);
}

async function consumeAPI(resource) {
  const baseUrl = "https://jsonplaceholder.typicode.com/";

  clearContent(contentContainer);
  turnOnLoading();

  const result = await $.ajax({
    url: baseUrl + resource
  })

  showContent(result, resource);
}

function turnOnLoading() {
  $("#body").addClass("loading-background");
  $("#loading").css("display", "block");
}

function turnOffLoading() {
  $("#body").removeClass("loading-background");
  $("#loading").css("display", "none");
}

function showContent(content, type) {
  if(type == "posts") {
    printPosts(content);
  } else if(type == "comments") {
    printComments(content);
  } else if(type == "photos") {
    printPhotos(content);
  }
}

function clearContent(content) {
  content.html("");
}

function printPosts(posts) {
  turnOffLoading();

  posts.forEach(post => {
    contentContainer.html(contentContainer.html() + `
      <div class="card mb-2" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
        </div>
      </div>
    `)
  });
}

function printComments(comments) {
  turnOffLoading();

  comments.forEach(comment => {
    contentContainer.html(contentContainer.html() + `
      <div class="card mb-2" style="width: 100%; padding: 15px;">
        <div >
          <img src="img/generic_avatar.jpg" class="card-img-top user-photo" alt="..." style="width: 80px; height: 80px; border-radius: 50%; margin-right: 10px;">
          <h2 style="display: inline; vertical-align: middle;">${comment.name}</h2>
        </div>
        <div class="card-body">
          <p class="card-text">${comment.body}</p>
          <img class="icon" src="img/email_icon.png" title="E-mail"> <a href="mailto:${comment.email}" style="text-decoration: none; vertical-align: middle;">${comment.email}</a>
          <img class="icon" src="img/like_icon.png" title="Like" style="cursor: pointer; margin-left: 15px; margin-right: 5px; vertical-align: middle;"> <span class="icon-text" style="vertical-align: middle;">0</span>
          <img class="icon" src="img/dislike_icon.png" title="Dislike" style="cursor: pointer; margin-left: 15px; margin-right: 5px; vertical-align: bottom;" <span class="icon-text" style="vertical-align: middle;">0</span>
        </div>
      </div>
    `)
  });
}

function printPhotos(photos) {
  turnOffLoading();

  photosSplitted = [];
  startPieace = 0;
  endPieace = 100;

  for(i = 0; i < 50; i++) {
    photosSplitted.push(photos.slice(startPieace, endPieace));
    startPieace = endPieace;
    endPieace += 100;
  }

  nextIndex = 0;

  photosSplitted[nextIndex].forEach(photo => {
    contentContainer.html(contentContainer.html() + `
      <div class="card" style="width: 18rem; padding: 5px; display: inline-block; margin-bottom: 20px; margin-right: 20px; cursor: pointer;" onclick="showModal('${photo.title}', '${photo.url}')">
        <img src="${photo.thumbnailUrl}" class="card-img-top" alt="...">
      </div>
    `);
  });

  nextIndex++;

  $(window).scroll(function () {
    if ($(window).height() + $(window).scrollTop() == $(document).height()) {
      photosSplitted[nextIndex].forEach(photo => {
        contentContainer.html(contentContainer.html() + `
          <div class="card" style="width: 18rem; padding: 5px; display: inline-block; margin-bottom: 20px; margin-right: 20px; cursor: pointer;" onclick="showModal('${photo.title}', '${photo.url}')">
            <img src="${photo.thumbnailUrl}" class="card-img-top" alt="...">
          </div>
        `);
      });

      nextIndex++;
    }
  });
}

function showModal(title, url) {
  $("#modalArea").html("");

  $("#modalArea").html(`
    <div class="modal fade" style="padding: 0;" id="imageModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="imageModalLabel">${title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <img src="${url}" class="img-fluid" alt="..." style="margin: 0;">
        </div>
      </div>
    </div>
  `);

  $('#imageModal').modal('show');
}
