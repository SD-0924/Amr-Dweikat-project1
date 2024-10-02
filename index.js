let darkMode = true;
function changeMode() {
  let root = document.querySelector(":root");
  if (darkMode) {
    root.style.setProperty("--bg_default", "#1A1A1A");
    root.style.setProperty("--bg_body", "#282828");
    root.style.setProperty("--lines-color", "#000000");
    root.style.setProperty("--body-text", "#EDEDED");
  } else {
    root.style.setProperty("--bg_default", "#FFFFFF");
    root.style.setProperty("--bg_body", "#F0F9FF");
    root.style.setProperty("--lines-color", "#DDDDDD");
    root.style.setProperty("--body-text", "#333333");
  }
  darkMode = !darkMode;
}
let showFavouritesTopics = true;
function showTopics() {
  if (showFavouritesTopics) {
    document.getElementById("topicList").style.display = "block";
  } else {
    document.getElementById("topicList").style.display = "none";
  }
  showFavouritesTopics = !showFavouritesTopics;
}
