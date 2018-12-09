import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.atlas(
      'assets',
      require('../../assets/images/assets.png'),
      null,
      require('../../assets/images/assets.json')
    )
    this.load.atlas(
      'tentacles',
      require('../../assets/images/tentacles.png'),
      null,
      require('../../assets/images/tentacles.json')
    )
    this.load.atlas(
      'particles',
      require('../../assets/images/particles.png'),
      null,
      require('../../assets/images/particles.json')
    )
  }

  create () {
    this.state.start('Game')
  }
}
