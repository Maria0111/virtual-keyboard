class App {
    constructor() {
      this.language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';
  
      this.capslockPressed = false;
      this.capslock = false;
      this.shift = false;
      this.upperCase = false;
      this.currentPosition = 0;
      this.position = null;
      this.lngCombination = ['ShiftLeft', 'ControlLeft'];
      this.combination = new Set();
    }
  
    get lng() {
      return this.language;
    }
  
    set lng(lng) {
      this.language = lng;
      localStorage.setItem('language', lng);
    }
  }
  
  const app = new App();
  
  export default app;