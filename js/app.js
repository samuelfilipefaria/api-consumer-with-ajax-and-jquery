function setOption(optionsSelector) {
  if(!isTheOptionValid(optionsSelector.val())) return;

  consumeAPI(optionsSelector.val());
}

function isTheOptionValid(selectedOption) {
  return ["posts", "comments", "photos"].includes(selectedOption);
}

function consumeAPI(resource) {
  const baseUrl = "https://jsonplaceholder.typicode.com/";

  $.ajax({url: baseUrl + resource}).done(response => console.log(response))
}
