import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import FinalState from './states/Final'

import './fonts.css'
import config from './config'

window.PhaserGlobal = {
  disableWebAudio: true
};

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super({
      width,
      height,
      renderer: Phaser.AUTO,
      parent: 'content',
      state: null,
      preserveDrawingBuffer: true
      // failIfMajorPerformanceCaveat: true
    })

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Final', FinalState, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    this.state.start('Boot')
  }
}

window.game = new Game()