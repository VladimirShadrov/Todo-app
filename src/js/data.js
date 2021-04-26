import { setDataArrayToLocalStorage } from './helpers';
import { setIdArrayItems } from './helpers';

export const defaultTasks = [
  {
    text: 'Complete online JavaScript course',
    completed: true,
    id: 10,
  },
  {
    text: 'Jog around the park 3x',
    completed: false,
    id: 200,
  },
  {
    text: 'Complete Todo App on Frontend Mentor',
    completed: false,
    id: 123,
  },
  {
    text: 'Pick up groceries',
    completed: false,
    id: 454,
  },
];

if (!localStorage.getItem('tasks')) {
  const tasks = setIdArrayItems(defaultTasks);
  setDataArrayToLocalStorage('tasks', tasks);
}
