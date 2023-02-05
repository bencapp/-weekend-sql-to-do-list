# Project Name

To Do List using SQL

## Description

_Duration: Weekend Project_

The prompt for this project was to create a full stack application that implements a SQL database and a node.js server to store, display, add, update, and delete tasks from a to do list. After completing the basic assignment to create functional POST, GET, PUT, and DELETE requests, I spent time on styling using bootstrap and a few other features, like the time display and the confirm delete pop-up. This was my first experience building a full stack application.

## Screen Shot

![example of to-do-list app](images/sampleImage.png)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)

## Installation

1. Create a database named `weekend-to-do-app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. I recommend using Postico to run those queries as that was used to create the queries.
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. In your browser, navigate to localhost:5000

## Usage

How does someone use this application? Tell a user story here.

1. Add list items using the input field at the top of the page
2. Complete list items by checking the boxes to the left of the interface. The date and time completed will be recorded.
3. Delete list items using the red wastebasket button for the corresponding list item. When clicked, a pop-up will appear asking to confirm the deletion.
4. Screen responsiveness: the display will change shape to maintain readability as the screen size gets smaller.

## Built With

- node.js
- AJAX
- SQL
- Bootstrap

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) and my cohort peers who helped me to make this application a reality.
