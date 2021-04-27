import '../styles/styles.scss';
import '../styles/general-settings.scss';
import '../styles/todo.scss';
import { defaultTasks } from './data';
import {
  createEmptyItem,
  createTaskItem,
  getDomItem,
  getDomItemsArray,
  fillTaskList,
  markTaskAsCompleted,
  getDataArrayFromLocalStorage,
  setIdArrayItems,
  setDataArrayToLocalStorage,
  deleteTask,
  sortTasks,
  processListItems,
} from './helpers';

// Перенос изображений и шрифтов
require.context('../images', true, /\.(png|jpg|svg|gif)$/);

const todo = getDomItem('.todo');
const topBacground = getDomItem('.todo__top-background');
const bottomBackGround = getDomItem('.todo__bottom-background');
const themeSwitcher = getDomItem('.switcher');
const inputContainer = getDomItem('.input');
const inputField = getDomItem('.input__text-field');
const createToDoText = getDomItem('.input__info');
const inputCircle = getDomItem('.input__circle');
const tasks = getDomItem('.tasks');
const tasksContainer = getDomItem('.tasks__container');
const taskItem = getDomItemsArray('.tasks__item');
const taskCompleted = getDomItemsArray('.tasks__item-completed');
const taskControlsContainer = getDomItem('.tasks__footer');
const taskControlsContainerMobile = getDomItem('.tasks__controls-mobile');
const tasksControls = getDomItemsArray('.tasks__control');
const taskControlActive = getDomItemsArray('.tasks__control-active');
const clearCompletedButton = getDomItem('.tasks__clear-completed');
const footer = getDomItem('.footer');
const tasksLeft = getDomItem('.tasks__left');

function getItemsArray(selector) {
  const items = Array.from(document.querySelectorAll(selector));
  return items;
}

todo.addEventListener('mousedown', function (event) {
  if (event.target.tagName.toLowerCase === 'a') {
    event.preventDefault();
  }

  // Переключить тему
  if (event.target.classList.contains('switcher')) {
    setTheme();
  }

  // Пометить задачу как завершенную
  if (
    event.target.classList.contains('tasks__text') ||
    event.target.classList.contains('tasks__circle')
  ) {
    markTaskAsCompleted(
      'tasks',
      event,
      defaultTasks,
      tasksLeft,
      tasksContainer,
      '.tasks__item'
    );
    checkTheme();
  }

  // Удалить задачу
  if (event.target.classList.contains('tasks__close-btn')) {
    const allTasks = getDataArrayFromLocalStorage('tasks');
    const selectedTask = allTasks.find(
      (item) => item.id === +event.target.dataset.id
    );
    const taskIndex = allTasks.findIndex((item) => item === selectedTask);
    allTasks.splice(taskIndex, 1);

    processListItems(
      allTasks,
      'tasks',
      defaultTasks,
      tasksLeft,
      tasksContainer,
      '.tasks__item'
    );
  }

  // Показать активные задачи
  if (event.target.dataset.id === 'active') {
    sortTasks('tasks', false, tasksContainer, '.tasks__item');
    checkTheme();
  }

  // Показать завершенные задачи
  if (event.target.dataset.id === 'completed') {
    sortTasks('tasks', true, tasksContainer, '.tasks__item');
    checkTheme();
  }

  // Показать все задачи
  if (event.target.dataset.id === 'all') {
    fillTaskList(
      'tasks',
      defaultTasks,
      tasksLeft,
      tasksContainer,
      '.tasks__item'
    );
    checkTheme();
  }

  // Переключение между табами выбора статуса задач
  if (event.target.classList.contains('tasks__control')) {
    tasksControls.forEach((control) => {
      control.classList.remove('tasks__control-active');
      if (themeSwitcher.dataset.id === 'night') {
        control.style.color = 'rgba(91, 94, 126, 1)';
      } else {
        control.style.color = 'rgba(148, 149, 165, 1)';
      }
    });
    event.target.classList.add('tasks__control-active');
    const activeControl = getDomItem('.tasks__control-active');

    if (themeSwitcher.dataset.id === 'night') {
      tasksControls.forEach((control) => {
        control.addEventListener('mouseover', () => {
          control.style.color = 'rgba(227,228,241,1)';
        });
      });
      tasksControls.forEach((control) => {
        control.addEventListener('mouseout', () => {
          control.style.color = 'rgba(91,94,126,1)';
        });
      });
    } else {
      tasksControls.forEach((control) => {
        control.addEventListener('mouseover', () => {
          control.style.color = 'rgba(73, 76, 107, 1)';
        });
      });
      tasksControls.forEach((control) => {
        control.addEventListener('mouseout', () => {
          control.style.color = 'rgba(148, 149, 165, 1)';
        });
      });
    }

    activeControl.style.color = 'rgba(58,124,253,1)';
    activeControl.addEventListener('mouseover', () => {
      activeControl.style.color = 'rgba(58,124,253,1)';
    });
    activeControl.addEventListener('mouseout', () => {
      activeControl.style.color = 'rgba(58,124,253,1)';
    });
  }

  // Удалить завершенные задачи
  if (event.target.classList.contains('tasks__clear-completed')) {
    const allTasks = getDataArrayFromLocalStorage('tasks');
    const activeTasks = allTasks.filter((item) => !item.completed);

    processListItems(
      activeTasks,
      'tasks',
      defaultTasks,
      tasksLeft,
      tasksContainer,
      '.tasks__item'
    );
  }
});

// Создать новую задачу
inputField.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const newTask = {
      text: inputField.value || 'Some text',
      completed: false,
      id: 0,
    };

    inputField.value = '';
    inputField.blur();

    let tasksFromStorage = getDataArrayFromLocalStorage('tasks');
    tasksFromStorage.unshift(newTask);

    processListItems(
      tasksFromStorage,
      'tasks',
      defaultTasks,
      tasksLeft,
      tasksContainer,
      '.tasks__item'
    );
  }
});

setInterval(() => {
  if (inputField === document.activeElement) {
    inputField.previousElementSibling.classList.add('input__info-active');
    inputField.previousElementSibling.textContent = 'Currently typing';
    const currentlyTyping = getDomItem('.input__info-active');

    if (themeSwitcher.dataset.id === 'night') {
      currentlyTyping.style.color = 'rgba(200, 203, 231, 1)';
    } else {
      currentlyTyping.style.color = 'rgba(57, 58, 75, 1)';
    }
  } else {
    inputField.previousElementSibling.classList.remove('input__info-active');
    inputField.previousElementSibling.textContent = 'Create a new todo…';
  }
}, 100);

// Перемещение элементов списка
tasksContainer.addEventListener('dragstart', (event) => {
  const item = event.target.closest('.tasks__item');
  item.classList.add('selected');
});

tasksContainer.addEventListener('dragend', (event) => {
  const item = event.target.closest('.tasks__item');
  item.classList.remove('selected');
});

tasksContainer.addEventListener('dragover', (event) => {
  event.preventDefault();

  const activeElement = tasksContainer.querySelector('.selected');
  const currentElement = event.target;
  const movableItem =
    activeElement !== currentElement &&
    currentElement.classList.contains('tasks__item');

  if (!movableItem) return;

  const nextElement =
    currentElement === activeElement.nextElementSibling
      ? currentElement.nextElementSibling
      : currentElement;

  tasksContainer.insertBefore(activeElement, nextElement);
});

// Заполнить таск лист текущими задачами
fillTaskList('tasks', defaultTasks, tasksLeft, tasksContainer, '.tasks__item');

// Задать ховер эффект кругу слева от задачи
todo.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('tasks__circle')) {
    event.target.classList.add('tasks__circle-gradient');
  }

  if (event.target.classList.contains('tasks__text')) {
    event.target.previousElementSibling.classList.add('tasks__circle-gradient');
  }
});

todo.addEventListener('mouseout', (event) => {
  if (event.target.classList.contains('tasks__circle')) {
    event.target.classList.remove('tasks__circle-gradient');
  }

  if (event.target.classList.contains('tasks__text')) {
    event.target.previousElementSibling.classList.remove(
      'tasks__circle-gradient'
    );
  }
});

// Функционал по смене темы
function setNightTheme() {
  const taskItem = getItemsArray('.tasks__item');
  const taskCompleted = getItemsArray('.tasks__item-completed');

  topBacground.style.background =
    "url('./images/night-bg.png') center / cover no-repeat";
  bottomBackGround.style.backgroundColor = 'rgba(23, 24, 35, 1)';
  themeSwitcher.style.background =
    "url('./images/sun.svg') center / cover no-repeat";
  inputContainer.style.backgroundColor = 'rgba(37, 39, 61, 1)';
  inputContainer.style.color = 'rgba(118, 121, 146, 1)';
  inputField.style.color = 'rgba(200, 203, 231, 1)';
  createToDoText.style.color = 'rgba(118, 121, 146, 1)';
  inputCircle.style.border = '1px solid rgba(57, 58, 75, 0.95)';
  tasks.style.backgroundColor = 'rgba(37, 39, 61, 1)';
  tasks.style.boxShadow = '0px 35px 50px -15px rgba(0, 0, 0, 0.5)';
  taskItem.forEach((item) => {
    item.style.color = 'rgba(200, 203, 231, 1)';
    item.querySelector('.tasks__circle').style.border =
      '1px solid rgba(57, 58, 75, 1)';
    item.style.borderBottom = '1px solid rgba(57, 58, 75, 1)';
  });
  taskCompleted.forEach((item) => {
    item.querySelector('.tasks__text').style.color = 'rgba(77, 80, 103, 1)';
    item.querySelector('.tasks__circle').style.border = '1px solid transparent';
  });
  taskControlsContainer.style.color = 'rgba(91,94,126,1)';
  tasksControls.forEach((control) => {
    control.style.color = 'rgba(91,94,126,1)';
  });
  tasksControls.forEach((control) => {
    control.addEventListener('mouseover', () => {
      control.style.color = 'rgba(227,228,241,1)';
    });
  });
  tasksControls.forEach((control) => {
    control.addEventListener('mouseout', () => {
      control.style.color = 'rgba(91,94,126,1)';
    });
  });

  taskControlActive.forEach(
    (control) => (control.style.color = 'rgba(58,124,253,1)')
  );
  taskControlActive.forEach((control) => {
    control.addEventListener('mouseover', () => {
      control.style.color = 'rgba(58,124,253,1)';
    });
  });
  taskControlActive.forEach((control) => {
    control.addEventListener('mouseout', () => {
      control.style.color = 'rgba(58,124,253,1)';
    });
  });

  taskControlsContainerMobile.style.backgroundColor = 'rgba(37,39,61,1)';
  taskControlsContainerMobile.style.boxShadow =
    '0px 35px 50px -15px rgba(0, 0, 0, 0.5)';
  clearCompletedButton.addEventListener(
    'mouseover',
    () => (clearCompletedButton.style.color = 'rgba(227,228,241,1)')
  );
  clearCompletedButton.addEventListener(
    'mouseout',
    () => (clearCompletedButton.style.color = 'rgba(91,94,126,1)')
  );

  footer.style.color = 'rgba(91, 94, 126, 1)';
}

function setDayTheme() {
  const taskItem = document.querySelectorAll('.tasks__item');
  const taskCompleted = document.querySelectorAll('.tasks__item-completed');

  topBacground.style.background =
    "url('./images/day-bg.png') center / cover no-repeat";
  bottomBackGround.style.backgroundColor = 'rgba(250, 250, 250, 1)';
  themeSwitcher.style.background =
    "url('./images/moon.svg') center / cover no-repeat";
  inputContainer.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  inputContainer.style.color = 'rgba(148, 149, 165, 1)';
  inputField.style.color = 'rgba(73, 76, 107, 1)';
  createToDoText.style.color = 'rgba(148, 149, 165, 1)';
  inputCircle.style.border = '1px solid rgba(227, 228, 241, 1)';
  tasks.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  tasks.style.boxShadow = '0px 35px 50px -15px rgba(194, 195, 214, 0.5)';
  taskItem.forEach((item) => {
    item.style.color = 'rgba(73, 76, 107, 1)';
    item.querySelector('.tasks__circle').style.border =
      '1px solid rgba(227, 228, 241, 1)';
    item.style.borderBottom = '1px solid rgba(227, 228, 241, 1)';
  });
  taskCompleted.forEach((item) => {
    item.querySelector('.tasks__text').style.color = 'rgba(209, 210, 218, 1)';
    item.querySelector('.tasks__circle').style.border = '1px solid transparent';
  });
  taskControlsContainer.style.color = 'rgba(148, 149, 165, 1)';
  tasksControls.forEach((control) => {
    control.style.color = 'rgba(148, 149, 165, 1)';
  });
  tasksControls.forEach((control) => {
    control.addEventListener('mouseover', () => {
      control.style.color = 'rgba(73, 76, 107, 1)';
    });
  });
  tasksControls.forEach((control) => {
    control.addEventListener('mouseout', () => {
      control.style.color = 'rgba(148, 149, 165, 1)';
    });
  });
  taskControlActive.forEach(
    (control) => (control.style.color = 'rgba(58,124,253,1)')
  );
  taskControlActive.forEach((control) => {
    control.addEventListener('mouseover', () => {
      control.style.color = 'rgba(58, 124, 253, 1)';
    });
  });
  taskControlActive.forEach((control) => {
    control.addEventListener('mouseout', () => {
      control.style.color = 'rgba(58, 124, 253, 1)';
    });
  });
  taskControlsContainerMobile.style.backgroundColor = 'rgba(255, 255, 255,1)';
  taskControlsContainerMobile.style.boxShadow =
    '0px 35px 50px -15px rgba(194, 195, 214, 0.5)';
  clearCompletedButton.addEventListener(
    'mouseover',
    () => (clearCompletedButton.style.color = 'rgba(73, 76, 107, 1)')
  );
  clearCompletedButton.addEventListener(
    'mouseout',
    () => (clearCompletedButton.style.color = 'rgba(148, 149, 165, 1)')
  );
  footer.style.color = 'rgba(148, 149, 165, 1)';
}

function getThemeFromStorage() {
  const theme = localStorage.getItem('theme');

  return theme;
}

function sendThemeToStorage(theme) {
  localStorage.setItem('theme', theme);
}

function setTheme() {
  const theme = themeSwitcher.dataset.id;

  if (theme === 'day') {
    themeSwitcher.dataset.id = 'night';
    sendThemeToStorage('night');
    setNightTheme();
  }

  if (theme === 'night') {
    themeSwitcher.dataset.id = 'day';
    sendThemeToStorage('day');
    setDayTheme();
  }
}

function setThemeFromStorage() {
  const theme = getThemeFromStorage() || 'day';

  if (theme === 'day') {
    themeSwitcher.dataset.id = 'day';
    setDayTheme();
  }

  if (theme === 'night') {
    themeSwitcher.dataset.id = theme;
    setNightTheme();
  }
}
setThemeFromStorage();

export function checkTheme() {
  if (themeSwitcher.dataset.id === 'night') {
    setNightTheme();
  } else {
    setDayTheme();
  }
}
