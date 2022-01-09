// Abstraction
class Player {
  constructor() {
    // DOM Selector
    this.pilihan = document.querySelectorAll('li img');
    this.reset = document.querySelector('.reset');
  }

  // method
  gameStart() {
    this.pilihan.forEach((selections) => {
      selections.addEventListener('click', (selected) => {
        // function
        const pilihanKomputer = () => {
          const random = Math.floor(Math.random() * 3 + 1);
          if (random === 1) return 'batu';
          if (random === 2) return 'gunting';
          if (random === 3) return 'kertas';
        };

        const pilihanPlayer = selected.target.className;

        if (pilihanPlayer == pilihanKomputer()) return console.log('SERI');
        if (pilihanPlayer == 'batu')
          return pilihanKomputer() == 'gunting'
            ? console.log('WIN')
            : console.log('LOSE');
        if (pilihanPlayer == 'gunting')
          return pilihanKomputer() == 'kertas'
            ? console.log('WIN')
            : console.log('LOSE');
        if (pilihanPlayer == 'kertas')
          return pilihanKomputer() == 'batu'
            ? console.log('WIN')
            : console.log('LOSE');
      });
    });
  }
}

class NewPlayer extends Player {
  constructor() {
    super();
  }

  selectChoice() {
    this.pilihan.forEach((selected) => {
      selected.addEventListener('click', (selected) => {
        document
          .querySelector(`.${selected.target.className}`)
          .classList.add('player-select');
      });
    });
  }
}

// newObject
const newGame = new Player();
const SelectPlayer = new NewPlayer();

console.log(newGame.gameStart());

console.log(SelectPlayer.selectChoice());
