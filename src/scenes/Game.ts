import Phaser from "phaser";
import { MoveKeys } from "../movekeys";

// Store the player character in a variable of type Phaser.GameObjects.Image
var player: Phaser.GameObjects.Image;
// Store the cursor keys in a variable of type Phaser.Types.Input.Keyboard.CursorKeys
var moveKeys: MoveKeys;
// Store the speed of the player character in a variable of type number
var speed: number = 2;

export default class Demo extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // A player character image for rotating.
    this.load.image("player", "assets/player.png");
  }

  create() {
    // Create the player character in the center of the screen, no matter what the screen size is.
    player = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "player",
    );
    player.setAngle(0);
    if (!this.input.keyboard) {
      return;
    }

    moveKeys = new MoveKeys(this);
  }

  update() {
    var moveX: number = 0;
    var moveY: number = 0;

    if (moveKeys.up()) {
      moveY -= 1;
    }
    if (moveKeys.down()) {
      moveY += 1;
    }
    if (moveKeys.left()) {
      moveX -= 1;
    }
    if (moveKeys.right()) {
      moveX += 1;
    }

    // Only change the character's angle if the character is moving.
    if (moveX != 0 || moveY != 0) {
      var angle = Math.atan2(moveY, moveX) * (180 / Math.PI) + 90;
      player.setAngle(angle);

      player.x += moveX * speed;
      player.y += moveY * speed;

      // Turbo mode! Hold the spacebar to move faster.
      if (moveKeys.action()) {
        player.x += moveX * speed;
        player.y += moveY * speed;
      }
    }

    this.checkBounds();
  }

  checkBounds() {
    // If the character goes out of bounds, wrap around to the other side of the screen.
    if (player.x > this.scale.width) {
      player.x -= this.scale.width;
    } else if (player.x < 0) {
      player.x += this.scale.width;
    }

    if (player.y > this.scale.height) {
      player.y -= this.scale.height;
    } else if (player.y < 0) {
      player.y += this.scale.height;
    }
  }
}
