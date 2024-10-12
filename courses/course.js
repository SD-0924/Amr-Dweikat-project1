import data from "./topics.js";
import * as common from "../common.js";

const courseID = Number(window.location.search.substring(1));
const allFavouriteTopics = common.getFavouriteCourses();
const firstButton = document.getElementById("firstButton");
const secondButton = document.getElementById("secondButton");

// this event to handle mode button
firstButton.addEventListener("click", common.changeMode);

// this event to handle favourite button
secondButton.addEventListener("click", function () {
  common.showTopicAndTrigger(allFavouriteTopics, "../images");
});

// this method to trigger favoriteTopics variable in local storage
const triggerFavoriteTopics = () =>
  localStorage.setItem("favoriteTopics", JSON.stringify(allFavouriteTopics));

// this event to handle add to favourite button
const addToFavourite = () => {
  let courseIndex = allFavouriteTopics.indexOf(courseID);
  if (courseIndex == -1) {
    allFavouriteTopics.push(courseID);
    document.getElementById("favButton").innerHTML = "Remove from Favourites";
  } else {
    allFavouriteTopics.splice(courseIndex, 1);
    document.getElementById("favButton").innerHTML = "Add to Favourites";
  }
  triggerFavoriteTopics();
  common.showTopicsOnly(allFavouriteTopics, "../images");
};

// this method will check if current course in favourite list or not
const checkCourseInFavourite = () => {
  if (allFavouriteTopics.indexOf(courseID) === -1) {
    return "Add to Favourites";
  }
  return "Remove from Favourites";
};

// this method to create topics template for each course
const courseTopics = (topics) => {
  let supTopics = "";
  for (let topic of topics) {
    supTopics += `
    <div class="Item display-flex align-items-center">
          <ion-icon name="checkmark-circle-outline"></ion-icon>
          <p>${topic}</p>
    </div>
    `;
  }
  return supTopics;
};

// this method will create a course template with correct information
const courseDetails = (courseInformation) => {
  return `
    <div class="topMain display-flex">
        <div class="information display-flex flex-direction-column">
          <div class="display-flex flex-direction-column">
            <p class="fPOfTitle">${courseInformation.category}</p>
            <p class="sPOfTitle">${courseInformation.topic}</p>
            <div>
              ${common.starRatingTemplate(courseInformation.rating)}
            </div>
          </div>
          <p class="tPOfTitle">${courseInformation.description}</p>
        </div>
        <figure class="detailsItem display-flex flex-direction-column">
          <img
            src="../images/${courseInformation.image}"
            alt="${courseInformation.topic}"
            id="imageDetail"
          />
          <figcaption
            class="figcaptionDetails display-flex flex-direction-column"
          >
            <div>
              <span>${courseInformation.topic}</span> by
              <a
                href="${courseInformation.url}">${courseInformation.name}</a
              >
            </div>
            <div class="bottom display-flex flex-direction-column">
              <p class="firstP">Interested about this topic?</p>
              <button class="display-flex" id="thirdButton">
                <span id="favButton">${checkCourseInFavourite()}</span>
                <ion-icon name="heart-outline"></ion-icon>
              </button>
              <p class="secondP">Unlimited Credits</p>
            </div>
          </figcaption>
        </figure>
      </div>
      <div class="details display-flex flex-direction-column">
        <p class="ST">HTML Sub Topics</p>
        ${courseTopics(courseInformation.subtopics)}
      </div>`;
};

// this method will return page template for course
const changeDetails = () =>
  courseDetails(common.getCourseInformation(courseID));

// this method to render details page for each course
const renderCourseDetails = () =>
  (document.getElementById("courseDetails").innerHTML = changeDetails());

// when page loaded
document.addEventListener("DOMContentLoaded", function () {
  renderCourseDetails();
  common.setPageColor();
  common.checkDarkMode();
  common.checkShowFavouritesTopics();
  const thirdButton = document.getElementById("thirdButton");
  // this event to handle add to favourite button
  thirdButton.addEventListener("click", addToFavourite);
  common.showTopicsOnly(allFavouriteTopics, "../images");
});
