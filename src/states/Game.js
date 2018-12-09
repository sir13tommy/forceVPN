/* globals __DEV__, FbPlayableAd */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    game.stage.disableVisibilityChange = true
  }

  create (game) {
    this.gameObjects = { }

    let data = game.add.image(game.world.centerX, game.world.centerY, 'assets', 'data.png')
    data.anchor.set(0.5)

    game.add.tween(data.scale)
      .from({ x: 0, y: 0})
      .easing(Phaser.Easing.Bounce.Out)
      .start()

    let tentacles = game.add.group(game.world, 'tentacles')
    this.gameObjects.tentacles = tentacles
    tentacles.inputEnableChildren = true

    let particles = game.add.emitter(0, 0, 200)
    particles.makeParticles('particles', Phaser.Animation.generateFrameNames('particle_', 1, 4, '.png'))
    particles.gravity.set(0)
    particles.minParticleSpeed.set(-200, -200)
    particles.maxParticleSpeed.set(200, 200)

    let canFinal = false

    function spawnTentacle () {
      let tentacle = game.make.sprite(0, 0, 'tentacles')
      let wriggle = tentacle.animations.add('wriggle', Phaser.Animation.generateFrameNames('', 1, 11, '.png'))
      wriggle.play(10, true)
      wriggle.reverse()
      tentacle.anchor.set(0, 0.5)
      tentacles.add(tentacle)

      let { world } = game
      let offset = tentacle.width

      let positions = [{
        x: world.randomX,
        y: game.rnd.pick([-offset, world.height + offset])
      }, {
        x: game.rnd.pick([-offset, game.width + offset]),
        y: world.randomY 
      }]

      let {x, y} = game.rnd.pick(positions)
      tentacle.position.set(x, y)
      tentacle.rotation = game.physics.arcade.angleBetween(tentacle, data)
      game.physics.enable(tentacle)
      
      tentacle.update = () => {
        if (canFinal && tentacle.getBounds().contains(data.x, data.y)) {
          game.state.start('Final')
        }
      }
      game.physics.arcade.moveToXY(tentacle, data.x, data.y)
      tentacle.events.onInputDown.add((tentacle, pointer) => {
        tentacle.destroy()
        particles.x = pointer.x
        particles.y = pointer.y
        particles.start(true, Phaser.Timer.SECOND * 1, null, 30)
        spawnTentacle()
      })

      return tentacle
    }

    game.input.enabled = false

    let cursor = game.add.sprite(game.world.centerX, game.world.centerY, 'assets', 'cursor.png')
    cursor.anchor.set(0.5)
    let moveCursor
    game.add.tween(cursor.scale)
      .from({x: 0, y: 0})
      .easing(Phaser.Easing.Bounce.Out)
      .delay(Phaser.Timer.SECOND * 2)
      .start()
      .onComplete.add(() => {
        moveCursor = true
        cursor.alignIn(game.camera.view, Phaser.CENTER, 0, 0)
      })
    game.physics.enable(cursor)

    let tentacle = spawnTentacle()
    cursor.update = () => {
      if (moveCursor) {
        let speed = 100
        let tentacleBounds = tentacle.getBounds()
        let { centerX: targetX, centerY: targetY} = tentacleBounds
        game.physics.arcade.moveToXY(cursor, targetX, targetY, speed)
        if (tentacleBounds.containsRect(cursor.body)) {
          moveCursor = false
          cursor.body.velocity.set(0)
          game.add.tween(cursor.scale)
            .to({x: 0.7, y: 0.7}, Phaser.Timer.SECOND * 0.2)
            .yoyo(true)
            .start()
            .onComplete.add(() => {
              game.input.enabled = true
              cursor.destroy()
              tentacle.destroy()
              particles.x = cursor.x
              particles.y = cursor.y
              particles.start(true, Phaser.Timer.SECOND, null, 30)
              spawnTentacle()
              canFinal = true
            })
        }
      }
    }
  }

  update (game) { }

  render() {
    if (__DEV__) {
      this.gameObjects.tentacles.forEach(tentacle => {
        // game.debug.spriteBounds(tentacle)
      })
    }
  }
}
