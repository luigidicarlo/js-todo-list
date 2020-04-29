(() => {
    document.addEventListener('DOMContentLoaded', () => {
        var state = {
            todos: [],
        };
        var form = document.querySelector('.add-todo');
        var todoInput = document.querySelector('.add-todo input[name=todo]');
        var todoList = document.querySelector('.todo-list');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (todoInput.value.length < 1) {
                return;
            }

            const todo = {
                title: todoInput.value,
                isComplete: false
            };

            state.todos = [todo, ...state.todos];
            todoInput.value = '';

            render();
        });

        const render = () => {
            const { todos } = state;
            let listHtml = '';

            if (todos.length < 1) {
                listHtml = '<h2>Nothing left to do!</h2>'
            }

            todos.forEach((todo, index) => {
                listHtml += `
                    <div class="todo">
                        <p class="todo-title ${todo.isComplete ? 'complete' : ''}">${todo.title}</p>
                        <button class="todo-mark" data-todo-index="${index}">&check;</button>
                        <button class="todo-delete" data-todo-index="${index}">&times;</button>
                    </div>
                `;
            });

            todoList.innerHTML = listHtml;

            var todoMarkButtons = document.querySelectorAll('.todo button.todo-mark');
            var todoDeleteButtons = document.querySelectorAll('.todo button.todo-delete');

            todoMarkButtons.forEach(button => {
                button.addEventListener('click', e => onChangeTodoStatus(e));
            });

            todoDeleteButtons.forEach(button => {
                button.addEventListener('click', e => onDeleteTodo(e));
            });
        };

        const init = () => {
            render();
        };

        const onChangeTodoStatus = (e) => {
            const todoIndex = Number(e.target.dataset.todoIndex);
            state.todos[todoIndex].isComplete = !state.todos[todoIndex].isComplete;
            render();
        };

        const onDeleteTodo = (e) => {
            const todoIndex = Number(e.target.dataset.todoIndex);
            state.todos = state.todos.filter((todo, index) => index !== todoIndex);
            render();
        };

        init();
    });
})();