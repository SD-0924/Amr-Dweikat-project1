// this method to change page mode (light or dark)
function changeMode() {
  let root = document.querySelector(":root");
  let modeButton = document.getElementById("modeButton");
  if (JSON.parse(localStorage.getItem("darkMode"))) {
    // store values to the local storage
    localStorage.setItem("--bg_default", "#1A1A1A");
    localStorage.setItem("--bg_body", "#282828");
    localStorage.setItem("--lines-color", "#000000");
    localStorage.setItem("--body-text", "#EDEDED");
    modeButton.innerHTML = "Light Mode";
  } else {
    // store values to the local storage
    localStorage.setItem("--bg_default", "#FFFFFF");
    localStorage.setItem("--bg_body", "#F0F9FF");
    localStorage.setItem("--lines-color", "#DDDDDD");
    localStorage.setItem("--body-text", "#333333");
    modeButton.innerHTML = "Dark Mode";
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

// this method to show favourite topics
function showTopicsOnly() {
  let allFavouriteTopics = JSON.parse(localStorage.getItem("favoriteTopics"));
  let favoriteItems = document.getElementById("favouriteTopics");
  let childs = "";
  fetch("./topics.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      for (let courseID of allFavouriteTopics) {
        let value = `<div>`;
        for (let i = 1; i <= 5; i++) {
          if (i <= Math.round(Number(data[Number(courseID) - 1]["rating"]))) {
            value += `<span class="fa fa-star checked"></span>`;
          } else {
            value += `<span class="fa fa-star"></span>`;
          }
        }
        value += `</div>
            </figcaption>
          </figure>`;
        childs +=
          `
        <figure class="favoriteItem display-flex flex-direction-column">
            <img
              class="favoutiteImage"
              src="../images/${data[Number(courseID) - 1]["image"]}"
              alt="${data[Number(courseID) - 1]["topic"]}"
            />
            <figcaption class="favouriteFigcaption">
              <div class="favoriteTitle">${
                data[Number(courseID) - 1]["topic"]
              }</div>` + value;
      }
      favoriteItems.innerHTML = childs;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function showTopicAndTrigger() {
  showTopicsOnly();
  if (!JSON.parse(localStorage.getItem("showFavouritesTopics"))) {
    document.getElementById("topicList").style.display = "block";
  } else {
    document.getElementById("topicList").style.display = "none";
  }
  localStorage.setItem(
    "showFavouritesTopics",
    !JSON.parse(localStorage.getItem("showFavouritesTopics"))
  );
}

// this method to change page details for each course
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
      document.getElementById("description").innerHTML =
        data[Number(courseID) - 1]["description"];
      document.getElementById("imageDetail").src =
        "../images/" + data[Number(courseID) - 1]["image"];

      document.getElementById("imageDetail").alt =
        "../images/" + data[Number(courseID) - 1]["topic"];

      document.getElementById("name").textContent =
        data[Number(courseID) - 1]["name"];

      for (let index = 1; index <= 6; index++) {
        document.getElementById("subtopics" + index).innerHTML =
          data[Number(courseID) - 1]["subtopics"][index - 1];
      }
      let allFavouriteTopics = JSON.parse(
        localStorage.getItem("favoriteTopics")
      );
      if (allFavouriteTopics.indexOf(courseID) != -1) {
        document.getElementById("favButton").innerHTML =
          "Remove from Favourites";
      } else {
        document.getElementById("favButton").innerHTML = "Add to Favourites";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// this method to add course to favourite list
function addToFavourite() {
  const courseID = window.location.search.substring(1);
  let allFavouriteTopics = JSON.parse(localStorage.getItem("favoriteTopics"));
  let courseIndex = allFavouriteTopics.indexOf(courseID);
  if (courseIndex == -1) {
    allFavouriteTopics.push(courseID);
    document.getElementById("favButton").innerHTML = "Remove from Favourites";
  } else {
    allFavouriteTopics.splice(courseIndex, 1);
    document.getElementById("favButton").innerHTML = "Add to Favourites";
  }
  localStorage.setItem("favoriteTopics", JSON.stringify(allFavouriteTopics));
  showTopicsOnly();
}

// this method will be called after page loaded
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
  }
  if (!localStorage.getItem("darkMode")) {
    localStorage.setItem("darkMode", true);
  }
  if (!localStorage.getItem("showFavouritesTopics")) {
    localStorage.setItem("showFavouritesTopics", false);
  }
  if (!localStorage.getItem("favoriteTopics")) {
    localStorage.setItem("favoriteTopics", JSON.stringify([]));
  }
  if (JSON.parse(localStorage.getItem("showFavouritesTopics"))) {
    document.getElementById("topicList").style.display = "block";
  } else {
    document.getElementById("topicList").style.display = "none";
  }
  if (JSON.parse(localStorage.getItem("darkMode"))) {
    document.getElementById("modeButton").innerHTML = "Dark Mode";
  } else {
    document.getElementById("modeButton").innerHTML = "Light Mode";
  }
});

/*  
the next step is :
1) make dark mode working always => done by using local storage
2) make search par working
3) make details page and favorite page as dynamic instead of static => done by using local storage
*/
