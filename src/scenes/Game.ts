import Phaser, { Physics } from "phaser"
import { MoveKeys } from "../movekeys"
import EvilRedSquare from "../enemies/EvilRedSquare"

export default class Game extends Phaser.Scene {
  // Store the player character in a variable of type Phaser.GameObjects.Image
  private player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  // Store the speed of the player character in a variable of type number
  private speed: number = 2

  private enemies!: Physics.Arcade.Group
  private moveKeys!: MoveKeys

  constructor() {
    super("game")
  }

  create() {
    // Create the player character in the center of the screen, no matter what the screen size is.
    this.player = this.physics.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "player",
    )
    this.player.setAngle(0)
    this.player.setCollideWorldBounds(true)

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
      this.player,
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
    // TODO: changing angle shouldn't not be instantanious.
    const vector = this.moveKeys.getVector()

    if (vector.length() > 0) {
      this.player.angle = vector.angle() * (180 / Math.PI)

      if (this.moveKeys.action()) {
        this.player.x += vector.x * this.speed * 2
        this.player.y += vector.y * this.speed * 2
      } else {
        this.player.x += vector.x * this.speed
        this.player.y += vector.y * this.speed
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
