-- CREATE INITIAL TABLE
CREATE TABLE "toDoList" (
    "id" serial PRIMARY KEY,
    "task" varchar(80) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE,
    "timeCompleted" varchar(200)
);

-- DUMMY DATA
INSERT INTO "toDoList" (task)
VALUES ('Vaccuum'),
('Grocery shopping'),
('Brush teeth'),
('Take a nap');