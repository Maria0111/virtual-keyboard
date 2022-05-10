import './scss/style.scss';

import { initLayout, textarea } from './js/createLayout';
import { keyUp, keyDown } from './js/functions';
import app from './js/App';

initLayout();

document.addEventListener('keydown', (e) => {
  let key = e.code;
  e.preventDefault();
  keyDown(key);
  try {
    document.querySelector(`.${key}`).classList.add('active');
  } catch (error) {
    key = null;
  }

  app.combination.add(key);
});

document.addEventListener('keyup', (e) => {
  let key = e.code;
  keyUp(key);
  try {
    document.querySelector(`.${key}`).classList.remove('active');
  } catch (error) {
    key = null;
  }

  if (app.combination.has(app.lngCombination[0]) && app.combination.has(app.lngCombination[1])) {
    keyDown('Lng');
  }
  app.combination.delete(key);
});

document.addEventListener('mousedown', (e) => {
  if (e.target.closest('.btn')) {
    const key = e.target.classList[0];
    keyDown(key);
    document.querySelector(`.${key}`).classList.add('active');
  }
});

document.addEventListener('mouseup', (e) => {
  if (e.target.closest('.btn')) {
    const key = e.target.classList[0];
    keyUp(key);
    document.querySelector(`.${key}`).classList.remove('active');
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.closest('.btn')) {
    const key = e.target.classList[0];
    keyUp(key);
    document.querySelector(`.${key}`).classList.remove('active');
  }
});

textarea.addEventListener('blur', (e) => {
  e.target.focus();
});