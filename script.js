
        document.addEventListener('DOMContentLoaded', () => {
            const taskInput = document.getElementById('task-input');
            const addTaskButton = document.getElementById('add-task');
            const taskList = document.getElementById('task-list');

            // Load tasks from localStorage
            const loadTasks = () => {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks.forEach(task => {
                    createTaskElement(task.text, task.completed);
                });
            };

            const saveTasks = () => {
                const tasks = [];
                document.querySelectorAll('#task-list li').forEach(li => {
                    tasks.push({
                        text: li.querySelector('.task-text').textContent,
                        completed: li.classList.contains('completed'),
                    });
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
            };

            const createTaskElement = (text, completed = false) => {
                const li = document.createElement('li');
                if (completed) li.classList.add('completed');

                const span = document.createElement('span');
                span.className = 'task-text';
                span.textContent = text;
                li.appendChild(span);

                const actions = document.createElement('div');
                actions.className = 'actions';

                const completeButton = document.createElement('button');
                completeButton.className = 'complete';
                completeButton.textContent = 'Complete';
                completeButton.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    saveTasks();
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    li.remove();
                    saveTasks();
                });

                actions.appendChild(completeButton);
                actions.appendChild(deleteButton);
                li.appendChild(actions);

                taskList.appendChild(li);
                saveTasks();
            };

            addTaskButton.addEventListener('click', () => {
                const taskText = taskInput.value.trim();
                if (taskText) {
                    createTaskElement(taskText);
                    taskInput.value = '';
                }
            });

            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addTaskButton.click();
                }
            });

            loadTasks();
        });