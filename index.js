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
  if (!localStorage.getItem("favoriteTopics")) {
    localStorage.setItem("favoriteTopics", []);
  }
});

function changeDetails() {
  const courseID = window.location.search.substring(1);
  fetch("./topics.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("category").innerHTML =
        data[Number(courseID) - 1]["category"];
      document.getElementById("topic").innerHTML =
        data[Number(courseID) - 1]["topic"];
      document.getElementById("topic2").innerHTML =
        data[Number(courseID) - 1]["topic"];
      for (
        let i = 1;
        i <= Math.round(Number(data[Number(courseID) - 1]["rating"]));
        i++
      ) {
        document.getElementById("star" + i).classList.add("checked");
      }
      // document.getElementById("description").innerHTML =
      //   data[Number(courseID) - 1]["description"];
      document.getElementById("imageDetail").src =
        "../images/" + data[Number(courseID) - 1]["image"];

      document.getElementById("name").textContent =
        data[Number(courseID) - 1]["name"];

      for (let index = 1; index <= 6; index++) {
        document.getElementById("subtopics" + index).innerHTML =
          data[Number(courseID) - 1]["subtopics"][index - 1];
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
/*  
the next step is :
1) make dark mode working always => done by using local storage
2) make search par working
3) make details page and favorite page as dynamic instead of static
*/
