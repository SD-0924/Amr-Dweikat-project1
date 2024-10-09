import data from "./courses/topics.js";
import * as common from "../common.js";

const firstButton = document.getElementById("firstButton");
const secondButton = document.getElementById("secondButton");
const allFavouriteTopics = common.getFavouriteCourses();

// localStorage.clear();

// this event to handle mode button
firstButton.addEventListener("click", common.changeMode);

// this event to handle favourite button
secondButton.addEventListener("click", function () {
  common.showTopicAndTrigger(allFavouriteTopics);
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
