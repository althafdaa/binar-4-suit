class Player {
  constructor() {
    this.batu = document.querySelector('.batu');
    this.gunting = document.querySelector('.gunting');
    this.kertas = document.querySelector('.kertas');
  }
}

// random number from computer
const pilihanKomputer = () => {
  const random = Math.floor(Math.random() * 3 + 1);
  if (random === 1) return console.log('batu');
  if (random === 2) return console.log('gunting');
  if (random === 3) return console.log('kertas');
};

pilihanKomputer();
