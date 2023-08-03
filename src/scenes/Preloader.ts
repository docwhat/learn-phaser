import Phaser from "phaser"

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader")
  }

  preload() {
    this.load.image("player", "assets/player.png")
    this.load.image("evil_red_square", "assets/enemy.png")
  }

  create() {
    this.scene.start("game")
  }
}
