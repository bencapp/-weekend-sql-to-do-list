$(document).ready(onReady);

function onReady() {
  console.log("jquery loaded successfully");

  // create event listeners
  $("#input-form").on("submit", onAddTask);
  $("#to-do-list").on("click", ".delete-btn", onDelete);

  getList();
}

function onAddTask(event) {
  // prevent automatic reload
  event.preventDefault();

  const taskObject = { task: $("#new-entry").val() };

  console.log("adding task:", taskObject);
  $.ajax({ type: "POST", url: "/list", data: taskObject })
    .then(() => {
      getList();
    })
    .catch((error) => {
      console.log("Error in client POST:", error);
    });
}

function getList() {
  $.ajax({ type: "GET", url: "/list" })
    .then((response) => {
      console.log("getting list; list is:", response);
      renderList(response);
    })
    .catch((error) => {
      console.log("Error in client GET:", error);
    });
}

function onDelete() {
  const id = $(this).parents("tr").data("id");
  console.log($(this));
  console.log("deleting at id:", id);

  $.ajax({ type: "DELETE", url: `/list/${id}` })
    .then(() => {
      getList();
    })
    .catch((error) => {
      console.log("error in client DELETE:", error);
    });
}
// list parameter is an array of objects send from the database
function renderList(list) {
  $("#to-do-list").empty();
  for (let taskObject of list) {
    $("#to-do-list").append(`
        <tr data-id="${taskObject.id}">
            <td>${taskObject.task}</td>
            <td>${taskObject.completed}</td>
            <td>
                <button class="delete-btn">DELETE</button>
            </td>
        </tr>`);
  }
}
