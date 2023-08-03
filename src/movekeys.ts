export class MoveKeys {
  upKeys: Phaser.Input.Keyboard.Key[] = []
  downKeys: Phaser.Input.Keyboard.Key[] = []
  leftKeys: Phaser.Input.Keyboard.Key[] = []
  rightKeys: Phaser.Input.Keyboard.Key[] = []
  actionKeys: Phaser.Input.Keyboard.Key[] = []

  constructor(scene: Phaser.Scene) {
    if (!scene.input.keyboard) {
      return
    }

    this.upKeys = [
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    ]
    this.downKeys = [
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    ]
    this.leftKeys = [
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    ]
    this.rightKeys = [
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    ]
  }

  up(): boolean {
    return this.upKeys.some((key) => key.isDown)
  }
  down(): boolean {
    return this.downKeys.some((key) => key.isDown)
  }
  left(): boolean {
    return this.leftKeys.some((key) => key.isDown)
  }
  right(): boolean {
    return this.rightKeys.some((key) => key.isDown)
  }
  action(): boolean {
    return this.actionKeys.some((key) => key.isDown)
  }
}
