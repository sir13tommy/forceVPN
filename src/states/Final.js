import Phaser from 'phaser'

export default class extends Phaser.State {
  init () { }
  create (game) {
    let message = game.add.text(0, 0, 'Worry about\nyour data?', {
      font: 'bold 47px SegoeUI-Bold',
      fill: '#39b4fe',
      align: 'center'
    })
    message.anchor.set(0.5)
    message.alignIn(game.camera.view, Phaser.CENTER, 0, 0)

    let logo = game.add.image(0, 0, 'assets', 'logo.png')
    logo.anchor.set(0.5)
    logo.alignTo(message, Phaser.TOP_CENTER, 0, 30)

    let btnFrame = 'cta-btn.png'
    let ctaBtn = game.add.button(0, 0, 'assets', ctaHandler, null, btnFrame, btnFrame, btnFrame)
    ctaBtn.anchor.set(0.5)
    ctaBtn.alignTo(message, Phaser.BOTTOM_CENTER, 0, 50)

    let ctaBtnContent = game.make.text(0, 0, 'PROTECT', {
      font: 'bold 50px SegoeUI-Bold',
      fill: '#ffffff'
    })
    ctaBtnContent.anchor.set(0.5)
    ctaBtn.addChild(ctaBtnContent)

    game.add.tween(message.scale)
      .from({x: 0, y: 0})
      .easing(Phaser.Easing.Bounce.Out)
      .start()

    game.add.tween(logo.scale)
      .from({x: 0, y: 0})
      .easing(Phaser.Easing.Bounce.Out)
      .delay(Phaser.Timer.SECOND * 0.7)
      .start()

    let btnIdle = game.add.tween(ctaBtn.scale)
      .to({x: 0.7, y: 0.7})
      .yoyo(true)
      .repeat(-1)

    game.add.tween(ctaBtn.scale)
      .from({x: 0, y: 0})
      .easing(Phaser.Easing.Bounce.Out)
      .delay(Phaser.Timer.SECOND * 1.4)
      .chain(btnIdle)
      .start()

    function ctaHandler () {
      if (typeof FbPlayableAd !== 'undefined' && FbPlayableAd.onCTAClick) {
        FbPlayableAd.onCTAClick()
      } else {
        console.log('CTA click')
      }
    }
  }
}