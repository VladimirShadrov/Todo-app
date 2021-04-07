import '../styles/styles.scss';
import '../styles/general-settings.scss';
import '../styles/todo.scss';

// Перенос изображений и шрифтов
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
