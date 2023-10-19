"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  showNavComponents();
  $navLogOut.hide()
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  hideNavComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  showNavComponents();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/**Show new story submit form when user selects submit */
function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $newStoryForm.show();
}

$navSubmit.on("click", navSubmitClick);

/**Show my stories */

function navMyStoriesClick(evt) {
  console.debug("navMyStoriesClick", evt);
  hidePageComponents();
  putMyStoriesOnPage();
}

$navMyStories.on("click", navMyStoriesClick);

/**Show favorites stories */

function navFavoriteStoriesClick(evt) {
  console.debug("navfavoritesStoriesClick", evt);
  hidePageComponents();
  putFavoriteStoriesOnPage();
}

$navFavorites.on("click", navFavoriteStoriesClick);