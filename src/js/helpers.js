export function createTaskItem(tasks, container) {
  let html = '';

  tasks.forEach((task) => {
    html += `
    <div class="tasks__item" data-id="${task.completed}">
      <div class="tasks__circle"></div>
      <p class="tasks__text">${task.text}</p>
      <a href="#" class="tasks__close-btn" data-id="delete-task"></a>
    </div>
    `;
  });

  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', html);
}

export function createEmptyItem(container) {
  const html = `
    <div class="tasks__item">
      <div class="tasks__circle"></div>
      <p class="tasks__text">You don't have any scheduled tasks</p>
    </div>
  `;

  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', html);
}
