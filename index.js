function changeMode() {
  let root = document.querySelector(":root");
  if (JSON.parse(localStorage.getItem("darkMode"))) {
    // store values to the local storage
    localStorage.setItem("--bg_default", "#1A1A1A");
    localStorage.setItem("--bg_body", "#282828");
    localStorage.setItem("--lines-color", "#000000");
    localStorage.setItem("--body-text", "#EDEDED");
  } else {
    // store values to the local storage
    localStorage.setItem("--bg_default", "#FFFFFF");
    localStorage.setItem("--bg_body", "#F0F9FF");
    localStorage.setItem("--lines-color", "#DDDDDD");
    localStorage.setItem("--body-text", "#333333");
  }
  root.style.setProperty("--bg_default", localStorage.getItem("--bg_default"));
  root.style.setProperty("--bg_body", localStorage.getItem("--bg_body"));
  root.style.setProperty(
    "--lines-color",
    localStorage.getItem("--lines-color")
  );
  root.style.setProperty("--body-text", localStorage.getItem("--body-text"));

  localStorage.setItem(
    "darkMode",
    !JSON.parse(localStorage.getItem("darkMode"))
  );
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

// after page loaded get latest colors
document.addEventListener("DOMContentLoaded", function () {
  let root = document.querySelector(":root");
  // localStorage.clear();
  if (localStorage.getItem("--bg_default")) {
    root.style.setProperty(
      "--bg_default",
      localStorage.getItem("--bg_default")
    );
    root.style.setProperty("--bg_body", localStorage.getItem("--bg_body"));
    root.style.setProperty(
      "--lines-color",
      localStorage.getItem("--lines-color")
    );
    root.style.setProperty("--body-text", localStorage.getItem("--body-text"));
  } else {
    localStorage.setItem("darkMode", true);
  }
});

/*  
the next step is :
1) make dark mode working always => done by using local storage
2) make search par working
3) make details page and favorite page as dynamic instead of static
*/
