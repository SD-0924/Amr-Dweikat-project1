import data from "./courses/topics.js";
import * as common from "../common.js";

const firstButton = document.getElementById("firstButton");
const secondButton = document.getElementById("secondButton");
const search = document.getElementById("search");
const allFavouriteTopics = common.getFavouriteCourses();

// this event to handle mode button
firstButton.addEventListener("click", common.changeMode);

// this event to handle favourite button
secondButton.addEventListener("click", function () {
  common.showTopicAndTrigger(allFavouriteTopics);
});

// this method to create course structure
const courseTemplate = (courseInfo) => {
  return `
  <figure class="item display-flex flex-direction-column">
          <a
            class="item display-flex flex-direction-column"
            href="./courses/index.html?${courseInfo.id}"
          >
            <img src="./images/${courseInfo.image}" alt="${courseInfo.topic}" />
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

// this method to check which courses I need to render
const getAllCourses = (text) => {
  let counter = 0;
  let courses = "";
  for (let course of data) {
    if (
      course.category.toLowerCase().includes(text.toLowerCase()) ||
      course.name.toLowerCase().includes(text.toLowerCase()) ||
      course.topic.toLowerCase().includes(text.toLowerCase())
    ) {
      counter++;
      courses += courseTemplate(course);
    }
  }
  document.getElementById("result").innerHTML = `"${counter}" Web Topics Found`;
  if (counter === 0)
    courses = "Sorry , we don't have the course that you are looking for";
  return courses;
};

// this method to render all courses depends on user search
const renderCourses = (text) => {
  document.getElementById("courses").innerHTML = getAllCourses(text);
};

// this event listener to get text in search bar
search.addEventListener("input", (event) => {
  const searchText = event.target.value;
  renderCourses(searchText);
});

// this method to set some variables in local storage
const setVariables = () => {
  if (!localStorage.getItem("darkMode")) {
    localStorage.setItem("darkMode", true);
  }
  if (!localStorage.getItem("showFavouritesTopics")) {
    localStorage.setItem("showFavouritesTopics", false);
  }
  if (!localStorage.getItem("favoriteTopics")) {
    localStorage.setItem("favoriteTopics", JSON.stringify([]));
  }
};

// when page loaded
window.onload = function () {
  setVariables();
  common.setPageColor();
  common.checkElements();
  common.showTopicsOnly(allFavouriteTopics);
  renderCourses("");
};
