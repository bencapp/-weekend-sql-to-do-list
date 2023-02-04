$(document).ready(onReady);

function onReady() {
  // create event listeners
  $("#input-form").on("submit", onAddTask);
  $("#to-do-list").on("click", ".delete-btn", onDelete);
  $("#to-do-list").on("click", ".completed-checkbox", onCheckToggle);

  getList();
}

function onAddTask(event) {
  // prevent automatic reload
  event.preventDefault();

  // if input is empty, do not add
  if (!$("#new-entry").val()) {
    return;
  }

  const taskObject = { task: $("#new-entry").val() };

  $.ajax({ type: "POST", url: "/list", data: taskObject })
    .then(() => {
      getList();
      $("#new-entry").val("");
    })
    .catch((error) => {
      console.log("Error in client POST:", error);
    });
}

function getList() {
  $.ajax({ type: "GET", url: "/list" })
    .then((response) => {
      renderList(response);
    })
    .catch((error) => {
      console.log("Error in client GET:", error);
    });
}

function onCheckToggle(event) {
  event.preventDefault();
  const id = $(this).parents("tr").data("id");
  const checked = $(this).is(":checked");

  $.ajax({ type: "PUT", url: `/list/${id}`, data: { completed: checked } })
    .then(() => {
      getList();
    })
    .catch((error) => {
      console.log("error in client PUT:", error);
    });
}

function onDelete() {
  const id = $(this).parents("tr").data("id");
  console.log("in on delete");

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
    const thisID = taskObject.id;
    let checkedVal = "";
    if (taskObject.completed) {
      checkedVal = "checked";
    }
    $("#to-do-list").append(`
        <tr data-id="${thisID}" class="${checkedVal} row bg-light border border-success">
            <td class="checkbox-cell col-1 d-flex justify-content-center p-3">
                <input class="completed-checkbox" id="check-toggle-${thisID}" type="checkbox" ${checkedVal}/>
            </td>
            <td class="col-9 d-flex align-items-center">${taskObject.task}</td>
            <td class="col d-flex justify-content-end p-0">
                <button class="btn btn-outline-danger" data-bs-toggle="modal"
                data-bs-target="#confirmDelete">🗑️</button>
            </td>
        </tr>`);
  }
}
