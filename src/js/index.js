import '../styles/styles.scss';
import '../styles/general-settings.scss';
import '../styles/todo.scss';

// Перенос изображений и шрифтов
require.context('../images', true, /\.(png|jpg|svg|gif)$/);

const todo = document.querySelector('.todo');
const topBacground = document.querySelector('.todo__top-background');
const bottomBackGround = document.querySelector('.todo__bottom-background');
const themeSwitcher = document.querySelector('.switcher');
const inputContainer = document.querySelector('.input');
const inputField = document.querySelector('.input__text-field');
const inputCircle = document.querySelector('.input__circle');
const tasksContainer = document.querySelector('.tasks');
const taskItem = document.querySelectorAll('.tasks__item');
const taskCompleted = document.querySelectorAll('.tasks__item-completed');
const taskControlsContainer = document.querySelector('.tasks__footer');
const taskControlsContainerMobile = document.querySelector(
  '.tasks__controls-mobile'
);
const tasksControls = document.querySelectorAll('.tasks__control');
const taskControlActive = document.querySelectorAll('.tasks__control-active');
const clearCompletedButton = document.querySelector('.tasks__clear-completed');
const footer = document.querySelector('.footer');

todo.addEventListener('click', function (event) {
  event.preventDefault();

  if (event.target.classList.contains('switcher')) {
    setTheme();
  }
});

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

function setNightTheme() {
  topBacground.style.background =
    "url('./images/night-bg.png') center / cover no-repeat";
  bottomBackGround.style.backgroundColor = 'rgba(23, 24, 35, 1)';
  themeSwitcher.style.background =
    "url('./images/sun.svg') center / cover no-repeat";
  inputContainer.style.backgroundColor = 'rgba(37, 39, 61, 1)';
  inputContainer.style.color = 'rgba(118, 121, 146, 1)';
  inputField.style.color = 'rgba(200, 203, 231, 1)';
  inputCircle.style.border = '1px solid rgba(57, 58, 75, 0.95)';
  tasksContainer.style.backgroundColor = 'rgba(37, 39, 61, 1)';
  tasksContainer.style.boxShadow = '0px 35px 50px -15px rgba(0, 0, 0, 0.5)';
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
  topBacground.style.background =
    "url('./images/day-bg.png') center / cover no-repeat";
  bottomBackGround.style.backgroundColor = 'rgba(250, 250, 250, 1)';
  themeSwitcher.style.background =
    "url('./images/moon.svg') center / cover no-repeat";
  inputContainer.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  inputContainer.style.color = 'rgba(148, 149, 165, 1)';
  inputField.style.color = 'rgba(73, 76, 107, 1)';
  inputCircle.style.border = '1px solid rgba(227, 228, 241, 1)';
  tasksContainer.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  tasksContainer.style.boxShadow =
    '0px 35px 50px -15px rgba(194, 195, 214, 0.5)';
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

function setThemeFromStorage() {
  const theme = getThemeFromStorage() || 'day';

  if (theme === 'day') {
    setDayTheme();
    themeSwitcher.dataset.id = 'day';
  }

  if (theme === 'night') {
    setNightTheme();
    themeSwitcher.dataset.id = 'night';
  }
}

setThemeFromStorage();
