import app from './App';
import keys from './keys';

const createWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  return wrapper;
};

const createDescription = () => {
  const description = document.createElement('div');
  description.classList.add('description');

  const lng = document.createElement('div');
  const os = document.createElement('div');
  lng.textContent = ' Переключение языка: Левый Ctrl + Левый Shift';
  os.textContent = 'Создано в Windows';

  description.append(lng, os);

  return description;
};

const createTextarea = () => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.setAttribute('autofocus', true);

  return textarea;
};

const keyLabel = (key) => {
  let label = '';

  if (app.lng === 'en') {
    label = app.upperCase === false ? key[0] : key[1];
  }
  if (app.lng === 'ru') {
    label = app.upperCase === false ? key[2] : key[3];
  }

  return label;
};

const btnTemplate = (key) => {
  const btn = document.createElement('button');
  btn.textContent = keyLabel(keys[key]);

  btn.classList.add(key);
  btn.classList.add('btn');

  if (key === 'Lng') {
    btn.classList.add(`lng-${app.lng}`);
  }

  if (key === 'CapsLock') {
    const mark = document.createElement('div');
    mark.classList.add('mark');
    if (app.capslock) {
      mark.classList.add('caps');
    }
    btn.append(mark);
  }

  return btn;
};

const createKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  const btns = Object.keys(keys).map((key) => btnTemplate(key));

  keyboard.append(...btns);

  return keyboard;
};

const wrapper = createWrapper();
export const textarea = createTextarea();
let keyboard = createKeyboard();
let description = createDescription();

export const initLayout = () => {
  wrapper.append(textarea, keyboard, description);
  document.body.append(wrapper);
};

export const reloadLabel = () => {
  keyboard.remove();
  description.remove();
  keyboard = createKeyboard();
  description = createDescription();
  wrapper.append(keyboard, description);
};