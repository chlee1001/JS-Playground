;(function () {
    'use strict'

    const get = (target) => {
        return document.querySelector(target)
    }

    const API_URL = 'http://localhost:3000/todos';
    const $todos = get('.todos');
    const $form = get('.todo_form');
    const $todoInput = get('.todo_input');

    const createTodoElement = (item) => {
        const {id, content, completed} = item
        const $todoItem = document.createElement('div')
        const isChecked = completed ? 'checked' : ''
        $todoItem.classList.add('item')
        $todoItem.dataset.id = id
        $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox' 
                ${isChecked}
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `
        return $todoItem
    }

    const renderAllTodos = (todos) => {
        $todos.innerHTML = '';
        todos.forEach(item => {
            const todoElement = createTodoElement(item);
            $todos.appendChild(todoElement);
        })
    }

    const getTodos = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(
                todos => renderAllTodos(todos))
            .catch(e => {
                console.error(e);
            })
    }

    const addTodo = (e) => {
        e.preventDefault(); // 새로고침 방지
        const todo = {
            content: $todoInput.value,
            completed: false,
        };
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
        }).then(getTodos).then(() => {
            $todoInput.value = '';
            $todoInput.focus();
        }).catch(e => console.error(e));
    }

    const toggleTodo = (e) => {
        if (e.target.className !== 'todo_checkbox') {
            return;
        }
        const $item = e.target.closest('.item');
        const id = $item.dataset.id;
        const completed = e.target.checked;

        fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({completed}),
            }
        )
            .then(getTodos)
            .catch(e => console.error(e))

    }

    const init = () => {
        window.addEventListener('DOMContentLoaded', () => { // HTML전부 불러왔을 때 getTodos함수 실행
            getTodos();
        })
        $form.addEventListener('submit', addTodo);
        $todos.addEventListener('click', toggleTodo);
    }
    init()
})()
