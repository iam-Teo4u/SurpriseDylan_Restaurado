// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }}


// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
'Dylan,',
'18 de septiembre',
'Color favorito: Azul, Rojo, Morado',
'Guasmo, Guayaquil',
'Usa lentes, y son muy bonitos para ser sincero',
'Estudia Marketing',
'Le gusta la Guatita',
'Es virgo, chales, ahre no jaja, con cariño',
'Sin apodo aun',
'Datos incompletos, el formulario no se encuentra - 404',
'Le gustan los superheroes',
'Es muy lindo, amable, sincero, algo inseguro',
'Le puse una recarga el 8 de Agosto, primer detalle',
'Me gusta, pero no soy su persona',
'Me duele no saber como ayudar, soy insuficiente',
'Vive con su ama y tiene una hermana menor',
'Su mejor amiga se llama Mer, de Mor pero potaxie',
'Puede que regrese a Cuenca',
'Lo quiero mucho :3',
'Es la primera persona que me gusta despues de mucho',
'Datos incompletos, el formulario no se encuentra - 404',
'Tuve una crisis con el',
'Estuvo en mi primer empleo',
'NOs conocimos un 5 de agosto',
'Datos incompletos, el formulario no se encuentra - 404',
'Estoy incompleto?',
'Reiniciando nucleo, existen datos corruptos'];


const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800);
  });
  counter = (counter + 1) % phrases.length;
};

next();