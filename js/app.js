function setOption(optionsSelector) {
  switch (optionsSelector.val()) {
    case "posts":
      console.log("posts")
      break;
    case "comments":
      console.log("comments")
      break;
    case "photos":
      console.log("photos")
      break;
    default:
      console.log("Opção inválida!");
  }
}