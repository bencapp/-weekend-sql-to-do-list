$(document).ready(onReady);

// client side STATE variable for last pressed delete button
let rowToDelete;

function onReady() {
  // create event listeners
  $("#input-form").on("submit", onAddTask);
  $("#confirmDelete").on("click", ".delete-btn", onDelete);
  $("#to-do-list").on("click", ".completed-checkbox", onCheckToggle);

  // event listener for modal
  $("#confirmDelete").on("show.bs.modal", onShowModal);

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
  // stop default refresh
  event.preventDefault();
  // get id of closest parent tr
  const id = $(this).parents("tr").data("id");
  const checked = $(this).is(":checked");

  // time functionality
  let time = new Date();
  let amPm = "AM";
  if (time.getHours() >= 12) {
    amPm = "PM";
  }
  const hour12 = (time.getHours() + 24) % 12 || 12;
  timeCompleted = `${hour12}:${time.getMinutes()} ${amPm} on ${time.getMonth()}/${time.getDate()}/${time.getFullYear()}`;

  $.ajax({
    type: "PUT",
    url: `/list/${id}`,
    data: { completed: checked, timeCompleted: timeCompleted },
  })
    .then(() => {
      getList();
    })
    .catch((error) => {
      console.log("error in client PUT:", error);
    });
}

function onShowModal(event) {
  // event.relatedTarget is the button that pressed to trigger the modal
  rowToDelete = $(event.relatedTarget).parents("tr").data("id");
}

function onDelete() {
  const id = rowToDelete;

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
        <tr data-id="${thisID}" class="${checkedVal} row bg-light">
            <td id="checkbox-${thisID}" class="checkbox-cell col-1 d-flex justify-content-center p-3">
                <input class="completed-checkbox" id="check-toggle-${thisID}" type="checkbox" ${checkedVal}/>
            </td>
            <td id="task-${thisID}" class="col-9 d-flex align-items-center">${taskObject.task}</td>
            <td class="col d-flex justify-content-end p-0">
                <button class="btn btn-outline-danger" data-bs-toggle="modal"
                data-bs-target="#confirmDelete">🗑️</button>
            </td>
        </tr>`);
    if (taskObject.completed) {
      $(`#task-${thisID}`).remove();
      $(`#checkbox-${thisID}`).after(`
        <td id="task-${thisID}" class="col-5 d-flex align-items-center">${taskObject.task}</td>
        <td class="date-completed col-5 d-flex align-items-end justify-content-end pe-0">Completed at ${taskObject.timeCompleted}</td>
      `);
    }
  }
}
