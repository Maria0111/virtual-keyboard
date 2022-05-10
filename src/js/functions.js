import app from './App';
import keys from './keys';
import { reloadLabel, textarea } from './createLayout';

const isChar = (key) => /^Key|^Digit|^Space|^Backslash|^Backquote|^Minus|^Equal|^Bracket|^Semicolon|^Quote|^Comma|^Period|^Slash/g.test(key);

export const keyDown = (key) => {
  const code = isChar(key) ? 'Key' : key;
  let char = '';

  switch (code) {
    case 'Key':
      if (app.lng === 'en') {
        char = app.upperCase === false ? keys[key][0] : keys[key][1];
      }
      if (app.lng === 'ru') {
        char = app.upperCase === false ? keys[key][2] : keys[key][3];
      }
      textarea.setRangeText(char, textarea.selectionStart, textarea.selectionEnd, 'end');
      break;

    case 'Enter':
      textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
      break;

    case 'Tab':
      textarea.setRangeText('\t', textarea.selectionStart, textarea.selectionEnd, 'end');
      break;

    case 'Lng':
      app.lng = app.lng === 'en' ? 'ru' : 'en';
      reloadLabel();
      break;

    case 'CapsLock':
      if (!app.capslockPressed) {
        app.upperCase = !app.upperCase;
        app.capslock = !app.capslock;
        reloadLabel();
      }
      app.capslockPressed = true;
      break;

    case 'ShiftLeft':
    case 'ShiftRight':
      if (!app.capslock) {
        app.upperCase = true;
      } else {
        app.upperCase = false;
      }
      reloadLabel();
      break;

    case 'ArrowLeft':
    case 'ArrowRight':
    case 'ArrowUp':
    case 'ArrowDown':
      textarea.setRangeText(keys[key][0], textarea.selectionStart, textarea.selectionEnd, 'end');
      break;

    case 'Backspace':
      textarea.setRangeText(char, textarea.selectionStart > 0 ? textarea.selectionStart - 1 : 0, textarea.selectionEnd, 'end');
      app.currentPosition = textarea.selectionStart;
      break;

    case 'Delete':
      textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd + 1, 'end');
      app.currentPosition = textarea.selectionStart;
      break;

    default:
      break;
  }
};

export const keyUp = (key) => {
  switch (key) {
    case 'CapsLock':
      app.capslockPressed = false;
      break;

    case 'ShiftLeft':
    case 'ShiftRight':
      if (!app.capslock) {
        app.upperCase = false;
      } else {
        app.upperCase = true;
      }

      reloadLabel();
      break;

    default:
      break;
  }
};