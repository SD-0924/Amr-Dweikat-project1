import data from "./courses/topics.js";

const root = document.querySelector(":root");

// this method to get all favourite courses
export const getFavouriteCourses = () =>
  JSON.parse(localStorage.getItem("favoriteTopics"));

// this method to create star rating template for each course
export const starRatingTemplate = (rating) => {
  let ratingTemplate = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.round(Number(rating))) {
      ratingTemplate += `<span class="fa fa-star checked"></span>`;
    } else {
      ratingTemplate += `<span class="fa fa-star"></span>`;
    }
  }
  return ratingTemplate;
};

// this method to set page colors depends on values inside local storage
export const setPageColor = () => {
  root.style.setProperty("--bg_default", localStorage.getItem("--bg_default"));
  root.style.setProperty("--bg_body", localStorage.getItem("--bg_body"));
  root.style.setProperty(
    "--lines-color",
    localStorage.getItem("--lines-color")
  );
  root.style.setProperty("--body-text", localStorage.getItem("--body-text"));
};

// this method to change color values inside local storage
const changeColorInLocalStorage = () => {
  let modeButton = document.getElementById("modeButton");
  if (JSON.parse(localStorage.getItem("darkMode"))) {
    localStorage.setItem("--bg_default", "#1A1A1A");
    localStorage.setItem("--bg_body", "#282828");
    localStorage.setItem("--lines-color", "#000000");
    localStorage.setItem("--body-text", "#EDEDED");
    modeButton.innerHTML = "Light Mode";
  } else {
    localStorage.setItem("--bg_default", "#FFFFFF");
    localStorage.setItem("--bg_body", "#F0F9FF");
    localStorage.setItem("--lines-color", "#DDDDDD");
    localStorage.setItem("--body-text", "#333333");
    modeButton.innerHTML = "Dark Mode";
  }
};

// this method to trigger darkMode variable in local storage
const triggerDarkMode = () =>
  localStorage.setItem(
    "darkMode",
    !JSON.parse(localStorage.getItem("darkMode"))
  );

// this method to change page mode (light or dark)
export const changeMode = () => {
  changeColorInLocalStorage();
  root.style.setProperty("--bg_default", localStorage.getItem("--bg_default"));
  root.style.setProperty("--bg_body", localStorage.getItem("--bg_body"));
  root.style.setProperty(
    "--lines-color",
    localStorage.getItem("--lines-color")
  );
  root.style.setProperty("--body-text", localStorage.getItem("--body-text"));
  triggerDarkMode();
};

// this method to check showFavouritesTopics variable in local storage
export const checkShowFavouritesTopics = () => {
  if (JSON.parse(localStorage.getItem("showFavouritesTopics"))) {
    document.getElementById("topicList").style.display = "block";
  } else {
    document.getElementById("topicList").style.display = "none";
  }
};

// this method to check darkMode variable in local storage
export const checkDarkMode = () => {
  if (JSON.parse(localStorage.getItem("darkMode"))) {
    document.getElementById("modeButton").innerHTML = "Dark Mode";
  } else {
    document.getElementById("modeButton").innerHTML = "Light Mode";
  }
};

// this method to prepare template course
const courseTemplate = (courseInfo, imagePath) => {
  return `
<div class="favoriteItems display-flex">
  <figure class="favoriteItem display-flex flex-direction-column">
    <img class="favoutiteImage" src="${imagePath}/${courseInfo.image}" alt="${
    courseInfo.topic
  }" />
    <figcaption class="favouriteFigcaption">
      <div class="favoriteTitle">${courseInfo.topic}</div>
      <div>${starRatingTemplate(courseInfo.rating)}</div>
    </figcaption>
  </figure>
</div>`;
};

// this method will get all information for specific course
export const getCourseInformation = (courseID) =>
  data.filter((course) => course.id === courseID)[0];

// this method will return template for all courses
const prepareAllCourses = (allFavouriteTopics, imagePath) => {
  let template = "";
  for (let topic of allFavouriteTopics) {
    template += courseTemplate(getCourseInformation(topic), imagePath);
  }
  return template;
};

// this method to show favourite topics
export const showTopicsOnly = (allFavouriteTopics, imagePath) => {
  document.getElementById("favouriteTopics").innerHTML = prepareAllCourses(
    allFavouriteTopics,
    imagePath
  );
};

// this method to trigger showFavouritesTopics variable in local storage
const triggerShowFavouritesTopics = () =>
  localStorage.setItem(
    "showFavouritesTopics",
    !JSON.parse(localStorage.getItem("showFavouritesTopics"))
  );

// this method to show favourite topic and trigger showFavouritesTopics variable
export const showTopicAndTrigger = (allFavouriteTopics, imagePath) => {
  showTopicsOnly(allFavouriteTopics, imagePath);
  if (!JSON.parse(localStorage.getItem("showFavouritesTopics"))) {
    document.getElementById("topicList").style.display = "block";
  } else {
    document.getElementById("topicList").style.display = "none";
  }
  triggerShowFavouritesTopics();
};
