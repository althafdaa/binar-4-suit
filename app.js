// PLAYER SECTION START

class Player {
  constructor() {
    // DOM SELECTOR FOR PLAYER
    this.batup = document.querySelector('.batu-p');
    this.kertasp = document.querySelector('.kertas-p');
    this.guntingp = document.querySelector('.gunting-p');

    //    DOM SELECTOR FOR COM
    this.batuc = document.querySelector('.batu-c');
    this.kertasc = document.querySelector('.kertas-c');
    this.guntingc = document.querySelector('.gunting-c');
  }
}
// PLAYER SECTION END

// UI MANIPULATION SECTION START
class UI {
  constructor() {
    this.resultText = document.createElement('h1');
    this.resultContainer = document.querySelector('.vs');
    this.pilihanPlayer;
    this.pilihanKomputer;
  }
  // 4kondisi
  // kondisi normal
  // kondisi menang
  // kondisi kalah
  // dan kondisi seri
  showDefault = () => {
    this.resultContainer.classList.remove('result-container__draw');
    this.resultContainer.classList.remove('result-container__win');
    this.resultText.classList.add('versus');
    this.resultText.innerHTML = 'VS';
    this.resultContainer.appendChild(this.resultText);
  };

  showWin = () => {
    this.resultContainer.classList.remove('result-container__draw');
    this.resultText.classList.remove('versus');
    this.resultContainer.classList.add('result-container__win');
    this.resultText.innerHTML = 'PLAYER 1<br/>WIN';
    this.resultContainer.appendChild(this.resultText);
  };

  showLose = () => {
    this.resultContainer.classList.remove('result-container__draw');
    this.resultText.classList.remove('versus');
    this.resultContainer.classList.add('result-container__win');
    this.resultText.innerHTML = 'COM<br/>WIN';
    this.resultContainer.appendChild(this.resultText);
  };

  showDraw = () => {
    this.resultContainer.classList.add('result-container__draw');
    this.resultText.classList.remove('versus');
    this.resultText.innerHTML = 'DRAW';
    this.resultContainer.appendChild(this.resultText);
  };

  logicForUI = (pilihanPlayer, pilihanKomputer) => {
    // return draw
    if (pilihanPlayer == pilihanKomputer) return this.showDraw();
    if (
      (pilihanPlayer == 'batu' && pilihanKomputer == 'gunting') ||
      (pilihanPlayer == 'gunting' && pilihanKomputer == 'kertas') ||
      (pilihanPlayer == 'kertas' && pilihanKomputer == 'batu')
    )
      // return win
      return this.showWin();
    // return lose
    if (
      (pilihanPlayer == 'gunting' && pilihanKomputer == 'batu') ||
      (pilihanPlayer == 'kertas' && pilihanKomputer == 'gunting') ||
      (pilihanPlayer == 'batu' && pilihanKomputer == 'kertas')
    )
      return this.showLose();
  };
}

// UI MANIPULATION SECTION END

// START NEW GAME
class NewGame extends UI {
  constructor(pilihanPlayer, pilihanKomputer) {
    super(pilihanPlayer, pilihanKomputer);
    this.reset = document.querySelector('.result-container__reset');
    this.options = document.querySelectorAll('.options');
    // immediately execute init() method setiap `new NewGame`
    this.init();
  }

  init = () => {
    this.player = new Player();
    this.showDefault();
    this.resetBtn();
  };

  userChoice = (user) => {
    return (this.pilihanPlayer = user);
  };

  comChoice = (com) => {
    return (this.pilihanKomputer = com);
  };

  playerOnclick = () => {
    this.player.batup.onclick = () => {
      //  tell javascript that player pick "batu"
      this.userChoice('batu');
      // tell js to manipulate batu img/button
      this.player.batup.classList.add('player-selected');
      this.disableGame();
      this.generateComChoice();
    };

    this.player.kertasp.onclick = () => {
      this.userChoice('kertas');
      this.player.kertasp.classList.add('player-selected');
      this.disableGame();
      this.generateComChoice();
    };

    this.player.guntingp.onclick = () => {
      this.userChoice('gunting');
      this.player.guntingp.classList.add('player-selected');
      this.disableGame();
      this.generateComChoice();
    };
  };

  comResponse = (choice) => {
    console.log('com pilih', choice);
    if (choice == 'batu') {
      this.comChoice('batu');
      this.player.batuc.classList.add('player-selected');
      this.player.guntingc.classList.remove('player-selected');
      this.player.kertasc.classList.remove('player-selected');
    }
    if (choice == 'kertas') {
      this.comChoice('kertas');
      this.player.kertasc.classList.add('player-selected');
      this.player.batuc.classList.remove('player-selected');
      this.player.guntingc.classList.remove('player-selected');
    }
    if (choice == 'gunting') {
      this.comChoice('gunting');
      this.player.guntingc.classList.add('player-selected');
      this.player.batuc.classList.remove('player-selected');
      this.player.kertasc.classList.remove('player-selected');
    }
  };

  disableGame = () => {
    this.player.batup.disabled = true;
    this.player.guntingp.disabled = true;
    this.player.kertasp.disabled = true;
  };

  uiResult = () => {
    if (this.pilihanPlayer && this.pilihanKomputer) {
      // inject the parameter to logicForUI
      this.logicForUI(this.pilihanPlayer, this.pilihanKomputer);
    }
  };

  resetBtn = () => {
    this.reset.onclick = () => {
      this.showDefault();
      this.options.forEach((options) => {
        options.classList.remove('player-selected');
        options.disabled = false;
      });
    };
  };

  generateComChoice = () => {
    const randomGenerator = () => {
      const options = ['batu', 'gunting', 'kertas'];
      return options[Math.floor(Math.random() * options.length)];
    };

    const random = randomGenerator();

    if (random == 'batu') {
      this.comResponse('batu');
      this.uiResult();
    }
    if (random == 'gunting') {
      this.comResponse('gunting');
      this.uiResult();
    }
    if (random == 'kertas') {
      this.comResponse('kertas');
      this.uiResult();
    }
  };

  setGame = () => {
    this.playerOnclick();
  };
}

const GameStart = new NewGame();

GameStart.setGame();
