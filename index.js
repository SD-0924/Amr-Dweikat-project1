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
const courseTemplate = () => {};

// this method to check which courses I need to render
const getAllCourses = (text) => {
  for (let course of data) {
  }
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
};
