const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-button");

let todos = JSON.parse(localStorage.getItem("handwritten-todos")) || [
  { text: "buy coffee", done: false },
  { text: "finish the thing", done: true },
];

function save() {
  localStorage.setItem("handwritten-todos", JSON.stringify(todos));
}

function render() {
  list.replaceChildren();

  todos.forEach((todo, index) => {
    const item = document.createElement("li");
    item.className = `todo${todo.done ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.setAttribute("aria-label", `Mark ${todo.text} complete`);

    const text = document.createElement("span");
    text.textContent = todo.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Delete ${todo.text}`);

    checkbox.addEventListener("change", () => {
      todos[index].done = checkbox.checked;
      save();
      render();
    });

    remove.addEventListener("click", () => {
      todos.splice(index, 1);
      save();
      render();
    });

    item.append(checkbox, text, remove);
    list.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (text) {
    todos.push({ text, done: false });
    input.value = "";
    save();
    render();
  }
});

clearButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.done);
  save();
  render();
});

render();
