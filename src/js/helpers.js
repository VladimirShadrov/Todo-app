import { defaultTasks } from './data';

// Получить ДОМ элемент
export function getDomItem(selector) {
  const domItem = document.querySelector(selector);

  return domItem;
}

// Получить массив ДОМ элементов
export function getDomItemsArray(selector) {
  const domItems = Array.from(document.querySelectorAll(selector));

  return domItems;
}

//Задать идентификаторы элементам массива
export function setIdArrayItems(key, defaultData) {
  const tasks = getDataArrayFromLocalStorage(key) || defaultData;

  for (let i = 0; i < tasks.length; i++) {
    tasks[i].id = i + 1;
  }

  return tasks;
}

// Получить массив данных из localStorage
export function getDataArrayFromLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));

  return data;
}

// Передать массив данных в localStorage
export function setDataArrayToLocalStorage(key, dataArray) {
  const currentTasks = setIdArrayItems(key, dataArray);

  localStorage.setItem(key, JSON.stringify(currentTasks));
}

// Создать задачу
export function createTaskItem(key, container) {
  const tasks = getDataArrayFromLocalStorage(key);

  let html = '';

  tasks.forEach((task) => {
    html += `
    <div class="tasks__item" data-id="${task.completed}">
      <div class="tasks__circle"></div>
      <p class="tasks__text">${task.text}</p>
      <a href="#" class="tasks__close-btn" data-name="delete-task" data-id="${task.id}"></a>
    </div>
    `;
  });

  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', html);
}

// Создать задачу-заглушку в случае, если массив задач пустой
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
