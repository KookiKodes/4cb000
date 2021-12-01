# Sending messages
##### My detailed notes on the issues and how to resolve issues located in [ticket #1](https://github.com/KookiKodes/4cb000/issues/1). This will be removed once pull request and solution has been solved.

## Sub-Issues
1. When a message is sent it does not immediatly appear on screen.
2. Messages are not displayed in the correct order when the page initially loads.

## Functionality
1. We would like new messages to be immediately added to the chat UI for both existing conversations and new conversations.
2. Messages should be displayed in order with the oldest messages at the top and newest messages at the bottom.

## Detailed Notes
1. Reviewed Message.js component to see how messages are being rendered. Noticed we're received an array of messages and rendering accoringly, however there is no guarantee that the received messaged are in the correct order. 
2. Reviewed thunkCreators.js to see how the messages are being fetched. Since the data is being received from our api, we could sort the received data once received from api.
3. Reviewed sub-issue 1 to determine why messages aren't being updated immediately. Noticed Input.js component expects a prop called postMessage, however in Active.js component we are not passing the Input component a postMessage function.
4. Reviewed utils folder to find postMessage function location. Found postMessage function located in file thunkCreators.js.
5. Upon further review, postMessage is mapped to the Input component on line 58.
6. Reviewing socket.emit and it's relative event handlers to see how we're updating the message.
7. Reviewed console and found error message stating that the message.conversationId didn't exist on undefined.
8. Reviewed postMessage function and noticed that we were not waiting for the received data from saveMessage function as it returns a promise.
9. Updated postMessage to an asynchronous function which corrected console error.
10. Noticed in component ActiveChat, that every time we sent a new message the ActiveChat component was not being re-rendered.
11. Reviewed function in depth and noticed a small syntax issue on line 61 and 62. We were trying to combine to objects with the && operator which was returning undefined and therefore causing the ActiveChat component to not be re-rendered.
12. Fixed sub-issue #1.

## Possible Solutions For Sub-Issue #1
#### 1. 

  ##### Idea:
  ##### Pros:
  1.
  ##### Cons:
  1.
## Possible Solutions For Sub-Issue #2
#### 1. Sort within Message component.
  ##### Idea:
  After mapping through the messages array we can .sort the messages based off of their creation time.
  ##### Pros:
  1. It's a simple solution, that resolves the issue with only a few lines of code. 
  2. Less likely to introduce bugs since we'd be changing a small portion of the code.
  ##### Cons:
   1. This can be less performant depending on the total number of messages. As now, every time we render the messages array we have to map through the messages and then sort them, effectively making this a O(n^2) solution.
   2. May cause more performance issues in the future. May be better to sort the messages before the component receives them.
#### 2. Sort within fetchConversations definition.
  ##### Idea:
  When the data fetched from "/api/conversations" is fetched we should sort the data by creation time.
  ##### Pros:
  1. Solves the issue at the root level.
  2. Faster performance as this operation only needs to occur once every time we fetch the messages.
  ##### Cons:
  1. Causes issues if we want to dynamically sort messages and/or filter messages in the future.
#### 3. Create custom sort method prop.
  ##### Idea:
  We'll create a sort function that accepts a string argument and returns a function that defines how to sort the received message array. We'll then create a memoized variable using useMemo method to cache the result, so that if the messages array or sortBy props don't change, the messages don't need to be re-sorted. 
  ##### Pros:
  1. Simple dynamic solution that allows us to slightly change how the Message component works.
  2. Allows us to create other methods in the future to sort the messages differently if needed.
  3. A combination of the above methods.
  ##### Cons:
  1. The performance is not entirely optimal as we have to sort through the data anytime the sortBy variable or messages array changes.
  2. Required we make changes to the overall functionality of the Message compoonent.
## Solutions
1. #### Sub-issue #2
    I chose the 3rd option as it provides a more dynamic way to interact and update how the messages are sorted in the future.
2. #### Sub-issue #1
    The solution required I fix two minor bugs by doing the following:
      1. Updating the postMessage function to asynchronous and await the received data after we saved the message to the database
      2. Updating the mapStateToProps function located in the ActiveChat component to correctly find the active conversation.
