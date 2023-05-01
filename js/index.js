class VirtualKeyboard {
  constructor(keys) {
    this.keys = keys;
    this.capsLock = false;
    this.textarea = document.querySelector('#textarea');
    this.keyboard = document.querySelector('#keyboard');
    this.addEventListeners();
    this.render();
  }

  render() {
    this.keys.forEach((row) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      row.forEach((key) => {
        const keyButton = document.createElement('button');
        keyButton.classList.add('key');
        keyButton.textContent = key;
        keyButton.value = key;
        rowDiv.appendChild(keyButton);
      });
      this.keyboard.appendChild(rowDiv);
    });
  }

  addEventListeners() {
    this.keyboard.addEventListener('click', (event) => {
      const key = event.target.value;
      if (key === 'Backspace') {
        this.textarea.value = this.textarea.value.slice(0, -1);
      } else if (key === 'Enter') {
        this.textarea.value += '\n';
      } else if (key === 'Tab') {
        this.textarea.value += '  ';
      } else if (key === 'Space') {
        this.textarea.value += ' ';
      } else if (key === 'Caps Lock') {
        this.capsLock = !this.capsLock;
        const buttons = document.querySelectorAll('.key');
        buttons.forEach((button) => {
          if (button.value.length === 1) {
            if (this.capsLock) {
              button.textContent = button.value.toUpperCase();
            } else {
              button.textContent = button.value.toLowerCase();
            }
          }
        });
      } else if (key === 'Shift') {
        // do nothing
      } else {
        if (this.capsLock) {
          this.textarea.value += key.toUpperCase();
        } else {
          this.textarea.value += key.toLowerCase();
        }
      }
      event.target.classList.add('pressed');
    });

    this.keyboard.addEventListener('mouseup', (event) => {
      event.target.classList.remove('pressed');
    });

    document.addEventListener('keyup', (event) => {
      const key = event.key;
      const buttons = document.querySelectorAll('.key');
      buttons.forEach((button) => {
        if (button.value === key) {
          button.classList.remove('pressed');
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      const key = event.key;
      const buttons = document.querySelectorAll('.key');
      buttons.forEach((button) => {
        if (button.value === key) {
          button.classList.add('pressed');
        }
      });
    });
  }
}

const keys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
];

const keyboard = new VirtualKeyboard(keys);