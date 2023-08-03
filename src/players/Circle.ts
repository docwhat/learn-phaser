import Phaser from "phaser"
import { MoveKeys } from "../movekeys"

export default class Circle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player")
  }

  update(cursors: MoveKeys) {
    if (!cursors) {
      return
    }
  }
}
