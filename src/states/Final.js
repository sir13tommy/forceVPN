import Phaser from 'phaser'

export default class extends Phaser.State {
  init () { }
  create (game) {
    let viewPaddings = {
      top: 20,
      left: 10,
      right: 10,
      bottom: 20
    }
    let final = game.add.group(game.world, 'Final')
    let message = game.make.text(0, 0, 'Worry about\nyour data?', {
      font: 'bold 47px notosans-bold',
      fill: '#39b4fe',
      align: 'center'
    })
    message.anchor.set(0.5)
    message.alignIn(game.camera.view, Phaser.CENTER, 0, 0)
    final.add(message)

    let logo = game.make.image(0, 0, 'assets', 'logo.png')
    logo.anchor.set(0.5)
    logo.alignTo(message, Phaser.TOP_CENTER, 0, 30)
    final.add(logo)

    let btnFrame = 'cta-btn.png'
    let ctaBtn = game.add.button(0, 0, 'assets', ctaHandler, null, btnFrame, btnFrame, btnFrame)
    ctaBtn.anchor.set(0.5)
    ctaBtn.alignTo(message, Phaser.BOTTOM_CENTER, 0, 50)
    final.add(ctaBtn)

    let ctaBtnContent = game.make.text(0, 0, 'PROTECT', {
      font: 'bold 50px notosans-bold',
      fill: '#ffffff'
    })
    ctaBtnContent.anchor.set(0.5)
    ctaBtn.addChild(ctaBtnContent)

    let maxWidth = game.camera.view.width - viewPaddings.left - viewPaddings.right
    let maxHeight = game.camera.view.height - viewPaddings.top - viewPaddings.bottom
    if (final.width > maxWidth || final.height > maxHeight) {
      game.scale.scaleSprite(final, maxWidth, maxHeight, true)
      final.alignIn(game.camera.view, Phaser.CENTER, 0, 0)
    }

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