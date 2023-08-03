import Phaser from "phaser"

export default class EvilRedSquare extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "evil_red_square")
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)
    this.setVelocity(
      Phaser.Math.Between(-100, 100),
      Phaser.Math.Between(-100, 100),
    )
    this.setBounce(1, 1)
  }
}
