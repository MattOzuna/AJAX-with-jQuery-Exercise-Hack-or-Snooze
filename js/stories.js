"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <input class="story-favorite" type="checkbox">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
  $userStoriesList.empty()

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);

    //adding to check for favorite
    currentUser.checkFavorites(story.storyId)
  }

  $allStoriesList.show();
}
/** Gets list of my stories from cuurent user, generates their HTML, and puts on page
 * with a remove button.
 */

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  $userStoriesList.empty();
  $allStoriesList.empty();


  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    $('<button class="story-remove">Delete</button>').appendTo($story);
    
    $userStoriesList.append($story);
    
    //adding to check for favorite
    currentUser.checkFavorites(story.storyId)
  }
  
  //add event listener for buttons
  $('.story-remove').on('click', removeStory)

  $userStoriesList.show();
}

/**Posts the new story submition to the server, generats and appends it to the HTML*/

async function submitNewStory(evt) {
  console.debug("submitNewStory", evt);
  evt.preventDefault();

  //makes obj for new story form info
  const newStory = {
    title: $('#story-title').val(),
    author: $('#story-author').val(),
    url: $('#story-url').val()
  }

  const response = await storyList.addStory(currentUser, newStory)

  //adds new story to HTMl
  currentUser.ownStories.push(response)
  const $story = generateStoryMarkup(storyList.stories[(storyList.stories.length - 1)]);
  $allStoriesList.append($story);

  $newStoryForm.trigger('reset')
  $newStoryForm.hide();
  updateUIOnUserLogin();
}

$newStoryForm.on('submit', submitNewStory)

/** Event listener and callback for deleting your own stories */

async function removeStory(evt) {
  console.debug("removeStory", evt);
  evt.target.parentElement.remove()
  return await storyList.removeStory(currentUser, evt.target.parentElement.id)


}

