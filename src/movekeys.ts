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
    const codes = Phaser.Input.Keyboard.KeyCodes
    const addKey = (key: number) => scene.input.keyboard!.addKey(key)

    this.upKeys = [addKey(codes.UP), addKey(codes.W)]
    this.downKeys = [addKey(codes.DOWN), addKey(codes.S)]
    this.leftKeys = [addKey(codes.LEFT), addKey(codes.A)]
    this.rightKeys = [addKey(codes.RIGHT), addKey(codes.D)]

    this.actionKeys = [
      addKey(codes.SPACE),
      addKey(codes.ENTER),
      addKey(codes.SHIFT),
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

  getVector(): Phaser.Math.Vector2 {
    let vector = new Phaser.Math.Vector2(0, 0)

    if (this.up()) {
      vector.y -= 1
    }
    if (this.down()) {
      vector.y += 1
    }
    if (this.left()) {
      vector.x -= 1
    }
    if (this.right()) {
      vector.x += 1
    }

    return vector.normalize()
  }
}
