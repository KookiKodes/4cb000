# Sending messages
##### My detailed notes on the issues and how to resolve issues located in [ticket #1](https://github.com/KookiKodes/4cb000/issues/1). This will be removed once pull request and solution has been solved.

## Issues
1. When a message is sent it does not immediatly appear on screen.
2. Messages are not displayed in the correct order when the page initially loads.

## Functionality
1. We would like new messages to be immediately added to the chat UI for both existing conversations and new conversations.
2. Messages should be displayed in order with the oldest messages at the top and newest messages at the bottom.

## Detailed Notes
1. Reviewed Message.js component to see how messages are being rendered. Noticed we're received an array of messages and rendering accoringly, however there is no guarantee that the received messaged are in the correct order. 

## Possible Solutions
#### 1. Solution for issue #2
  ##### Idea:
  After mapping through the messages array we can .sort the messages based off of their creation time.
  ##### Pros:
  1. It's a simple solution, that resolves the issue with only a few lines of code. 
  2. Less likely to introduce bugs since we'd be changing a small portion of the code.
  ##### Cons:
   1. This can be less performant depending on the total number of messages. As now, every time we render the messages array we have to map through the messages and then sort them, effectively making this a O(n^2) solution.
   2. May cause more performance issues in the future. May be better to sort the messages before the component receives them.

## Solution
1.