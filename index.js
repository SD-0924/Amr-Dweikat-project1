import data from "./courses/topics.js";
import * as common from "./common.js";

const firstButton = document.getElementById("firstButton");
const secondButton = document.getElementById("secondButton");
const search = document.getElementById("search");
const allFavouriteTopics = common.getFavouriteCourses();

// this event to handle mode button
firstButton.addEventListener("click", common.changeMode);

// this event to handle favourite button
secondButton.addEventListener("click", function () {
  common.showTopicAndTrigger(allFavouriteTopics, "./images");
});

// this method to create course structure
const courseTemplate = (courseInfo) => {
  return `
  <figure class="item display-flex flex-direction-column">
          <a
            class="item display-flex flex-direction-column"
            href="./courses/course.html?${courseInfo.id}"
          >
            <div id="imageContainer"><img src="./images/${
              courseInfo.image
            }" alt="${courseInfo.topic}" /></div>
            <figcaption class="figcaption display-flex flex-direction-column">
              <div>
                ${courseInfo.category}<span class="itemType">${
    courseInfo.topic
  }</span>
              </div>
              <div class="display-flex flex-direction-column">
                <div>
                  ${common.starRatingTemplate(courseInfo.rating)}
                </div>
                <p class="author">Author: ${courseInfo.name}</p>
              </div>
            </figcaption>
          </a>
    </figure>`;
};

// this method to check which courses should render
const getAllCourses = (text) => {
  let courses = "";
  for (let course of data) {
    if (
      course.category.toLowerCase().includes(text.toLowerCase()) ||
      course.name.toLowerCase().includes(text.toLowerCase()) ||
      course.topic.toLowerCase().includes(text.toLowerCase())
    ) {
      courses += courseTemplate(course);
    }
  }
  if (courses.length === 0)
    courses =
      "<p class='newText'>Sorry , we don't have the course that you are looking for</p>";
  return courses;
};

// this method to display number of courses after filter them based on text inside search par
const displayCoursesNumber = () => {
  const childs = document.getElementById("courses").children;
  let numberOfCourses = childs.length;
  if (childs[0].tagName === "P") {
    numberOfCourses = 0;
  }
  document.getElementById(
    "result"
  ).innerHTML = `"${numberOfCourses}" Web Topics Found`;
};

// this method to render all courses depends on user search
const renderCourses = (text) =>
  (document.getElementById("courses").innerHTML = getAllCourses(text));

// this event listener to get text in search bar
search.addEventListener("input", (event) => {
  renderCourses(event.target.value);
  displayCoursesNumber();
});

// this method to set darkMode variable in local storage
const putDarkModeInLocalStorage = () => {
  if (!localStorage.getItem("darkMode")) {
    localStorage.setItem("darkMode", true);
  }
};

// this method to set showFavouritesTopics variable in local storage
const putShowFavouritesTopicsInLocalStorage = () => {
  if (!localStorage.getItem("showFavouritesTopics")) {
    localStorage.setItem("showFavouritesTopics", false);
  }
};

// this method to set favoriteTopics variable in local storage
const putFavoriteTopicsInLocalStorage = () => {
  if (!localStorage.getItem("favoriteTopics")) {
    localStorage.setItem("favoriteTopics", JSON.stringify([]));
  }
};

// this method to set colors in local storage
const putColorsInLocalStorage = () => {
  if (!localStorage.getItem("--bg_default")) {
    localStorage.setItem("--bg_default", "#ffffff");
    localStorage.setItem("--bg_body", "#f0f9ff");
    localStorage.setItem("--lines-color", "#dddddd");
    localStorage.setItem("--body-text", "#333333");
  }
};

// when page loaded
document.addEventListener("DOMContentLoaded", function () {
  putDarkModeInLocalStorage();
  putShowFavouritesTopicsInLocalStorage();
  putFavoriteTopicsInLocalStorage();
  putColorsInLocalStorage();
  common.setPageColor();
  common.checkDarkMode();
  common.checkShowFavouritesTopics();
  common.showTopicsOnly(allFavouriteTopics, "./images");
  renderCourses("");
  displayCoursesNumber();
});
