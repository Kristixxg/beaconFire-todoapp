const tableBody = document.getElementById("tableBody");

const renderExistingTodos = async () => {
  try {
    const response = await fetch("/todos", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const todos = await response.json();
    // console.log(todos);

    todos.map((data) => {
      const statusText = data.status ? "Complete" : "Incomplete";
      const row = `
        <row>
          <td>${data.title}</td>
          <td>${data.description}</td>
          <td>${data.timestamp}</td>
          <td><button data-id="${data._id}" class="statusBtn">${statusText}</button></td>
        </row>`;

      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error(error);
  }
};
renderExistingTodos();

document.addEventListener("DOMContentLoaded", () => {
  const formEl = document.getElementById("form");
  const statusBtns = document.getElementsByClassName("statusBtns");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = document.getElementById("todoTitle").value;
    const description = document.getElementById("todoDescription").value;

    try {
      const response = await fetch("/todos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error Status: ${response.status} `);
      }

      const newTodo = await response.json();
      // console.log("New Item added: ", newTodo);
      document.getElementById("todoDescription").value = "";
      document.getElementById("todoTitle").value = "";
      tableBody.innerHTML = "";
      renderExistingTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await fetch(`/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      const updatedTodo = await response.json();
      // console.log("successfully dated todo: ", updatedTodo);
      tableBody.innerHTML = "";
      renderExistingTodos();
    } catch (error) {
      console.error(error);
    }
  };

  tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("statusBtn")) {
      const todoId = event.target.getAttribute("data-id");
      //   console.log("Todo Id: ", todoId);
      handleToggleStatus(todoId);
    }
  });

  formEl.addEventListener("submit", handleSubmit);
});
