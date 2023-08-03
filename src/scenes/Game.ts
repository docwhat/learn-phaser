import Phaser, { Physics } from "phaser"
import { MoveKeys } from "../movekeys"
import EvilRedSquare from "../enemies/EvilRedSquare"

// Store the player character in a variable of type Phaser.GameObjects.Image
let player: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
// Store the speed of the player character in a variable of type number
let speed: number = 2

export default class Game extends Phaser.Scene {
  private enemies!: Physics.Arcade.Group
  private moveKeys!: MoveKeys

  constructor() {
    super("game")
  }

  create() {
    // Create the player character in the center of the screen, no matter what the screen size is.
    player = this.physics.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "player",
    )
    player.setAngle(0)
    player.setCollideWorldBounds(true)

    // Enemies
    this.enemies = this.physics.add.group()
    this.enemies.add(
      new EvilRedSquare(this, this.scale.width / 4, this.scale.height / 4),
    )
    this.enemies.add(
      new EvilRedSquare(
        this,
        (3 * this.scale.width) / 4,
        this.scale.height / 4,
      ),
    )
    this.enemies.add(
      new EvilRedSquare(
        this,
        this.scale.width / 4,
        (3 * this.scale.height) / 4,
      ),
    )
    this.physics.add.collider(
      this.enemies,
      player,
      this.handleHit,
      undefined,
      this,
    )

    // Controls
    if (!this.input.keyboard) {
      return
    }
    this.moveKeys = new MoveKeys(this)
  }

  update() {
    let moveX: number = 0
    let moveY: number = 0

    if (this.moveKeys.up()) {
      moveY -= 1
    }
    if (this.moveKeys.down()) {
      moveY += 1
    }
    if (this.moveKeys.left()) {
      moveX -= 1
    }
    if (this.moveKeys.right()) {
      moveX += 1
    }

    // Only change the character's angle if the character is moving.
    if (moveX != 0 || moveY != 0) {
      var angle = Math.atan2(moveY, moveX) * (180 / Math.PI) + 90
      player.setAngle(angle)

      player.x += moveX * speed
      player.y += moveY * speed

      // Turbo mode! Hold the spacebar to move faster.
      if (this.moveKeys.action()) {
        player.x += moveX * speed
        player.y += moveY * speed
      }
    }
  }

  private handleHit(
    playerObject:
      | Phaser.Tilemaps.Tile
      | Phaser.Types.Physics.Arcade.GameObjectWithBody,
    enemyObject:
      | Phaser.Tilemaps.Tile
      | Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ) {
    const player = playerObject as Phaser.Physics.Arcade.Image
    this.physics.pause()
    player.setTint(0xff0000)
  }
}
