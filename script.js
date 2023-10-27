const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        if (todo && todo.completed) {
            todoEl.classList.add('completed');
            checkbox.checked = true;
        }

        todoEl.appendChild(checkbox);
        todoEl.appendChild(document.createTextNode(todoText));

        const deleteButton = document.createElement('span');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            todoEl.remove();
            updateLS();
        });

        todoEl.appendChild(deleteButton);

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = '';

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        const checkbox = todoEl.querySelector('input[type="checkbox"]');
        todos.push({
            text: todoEl.textContent,
            completed: todoEl.classList.contains('completed') || checkbox.checked
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
