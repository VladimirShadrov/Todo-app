import { checkTheme } from './index';

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
export function setIdArrayItems(dataArray) {
  const tasks = dataArray;

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
  const currentTasks = setIdArrayItems(dataArray);

  localStorage.setItem(key, JSON.stringify(currentTasks));
}

// Создать задачу
export function createTaskItem(data, container) {
  const tasks = data;

  let html = '';

  tasks.forEach((task) => {
    html += `
    <div class="tasks__item" data-completed="${task.completed}" data-id="${task.id}" draggable="true">
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

// Отрисовать текущие задачи
export function fillTaskList(
  key,
  defaultTasks,
  tasksLeftSelector,
  container,
  tasksCompletedSelector
) {
  const tasks = getDataArrayFromLocalStorage(key) || defaultTasks;
  const currentTasks = sortCompletedTasks(tasks, key).totalTasks;
  const unfinishedTasks = sortCompletedTasks(tasks, key).unperformed;

  tasksLeftSelector.innerHTML = unfinishedTasks;

  if (!currentTasks.length) {
    createEmptyItem(container);
  } else {
    createTaskItem(currentTasks, container);
  }

  setTasksClassCompleted(tasksCompletedSelector);
}

// Сортировать выполненные задачи
export function sortCompletedTasks(tasks, key) {
  const completedTasks = tasks.filter((item) => item.completed);
  const incompletedTasks = tasks.filter((item) => !item.completed);

  const tasksAvalible = [...incompletedTasks, ...completedTasks];
  const currentTasks = setIdArrayItems(tasksAvalible);
  setDataArrayToLocalStorage(key, currentTasks);

  return {
    totalTasks: currentTasks,
    unperformed: incompletedTasks.length,
  };
}

// Отметить выполненные задачи
export function setTasksClassCompleted(selector) {
  const tasks = getDomItemsArray(selector);

  tasks.forEach((task) => {
    if (task.dataset.completed === 'true') {
      task.classList.add('tasks__item-completed');
    }
  });
}

// Пометить задачу как завершенную
export function markTaskAsCompleted(
  key,
  target,
  defaultTasks,
  tasksLeftSelector,
  container,
  tasksCompletedSelector
) {
  const dataFromStorage = getDataArrayFromLocalStorage(key);
  let selectedTask = target.target.closest('.tasks__item');
  const selectedItem = dataFromStorage.find(
    (item) => item.id === +selectedTask.dataset.id
  );

  if (selectedItem.completed) {
    selectedItem.completed = false;
  } else {
    selectedItem.completed = true;
  }

  setDataArrayToLocalStorage(key, dataFromStorage);
  fillTaskList(
    key,
    defaultTasks,
    tasksLeftSelector,
    container,
    tasksCompletedSelector
  );
}

// Сортировать задачи
export function sortTasks(key, status, container, selector) {
  const allTasks = getDataArrayFromLocalStorage(key);
  const result = allTasks.filter((item) => item.completed === status);
  createTaskItem(result, container);
  setTasksClassCompleted(selector);
}

// Обработка элементов списка: задать ID, отпрвить в LocaleStorage, Отрисовать
export function processListItems(
  data,
  key,
  defaultTasks,
  tasksLeftSelector,
  container,
  tasksCompletedSelector
) {
  const tasksWithNewId = setIdArrayItems(data);
  setDataArrayToLocalStorage('tasks', tasksWithNewId);
  fillTaskList(
    key,
    defaultTasks,
    tasksLeftSelector,
    container,
    tasksCompletedSelector
  );
  checkTheme();
}
