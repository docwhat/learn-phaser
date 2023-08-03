export class MoveKeys {
  private scene: Phaser.Scene
  private upKeys: Phaser.Input.Keyboard.Key[] = []
  private downKeys: Phaser.Input.Keyboard.Key[] = []
  private leftKeys: Phaser.Input.Keyboard.Key[] = []
  private rightKeys: Phaser.Input.Keyboard.Key[] = []
  private actionKeys: Phaser.Input.Keyboard.Key[] = []
  private pads: Phaser.Input.Gamepad.Gamepad[] = []

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.initKeyboard()
    this.initGamepads()
  }

  initKeyboard() {
    if (!this.scene.input.keyboard) {
      return
    }

    const codes = Phaser.Input.Keyboard.KeyCodes
    const addKey = (key: number) => this.scene.input.keyboard!.addKey(key)

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

  initGamepads() {
    if (!this.scene.input.gamepad?.total) {
      this.scene.input.gamepad?.on("connected", this.initOneGamepad, this)
      this.scene.input.gamepad?.gamepads.forEach(this.initOneGamepad, this)
    }
  }

  initOneGamepad(pad: Phaser.Input.Gamepad.Gamepad) {
    console.dir(pad)
    this.pads.push(pad)
  }

  up(): boolean {
    return (
      this.pads.some((pad) => pad.up) || this.upKeys.some((key) => key.isDown)
    )
  }
  down(): boolean {
    return (
      this.pads.some((pad) => pad.down) ||
      this.downKeys.some((key) => key.isDown)
    )
  }
  left(): boolean {
    return (
      this.pads.some((pad) => pad.left) ||
      this.leftKeys.some((key) => key.isDown)
    )
  }
  right(): boolean {
    return (
      this.pads.some((pad) => pad.right) ||
      this.rightKeys.some((key) => key.isDown)
    )
  }
  action(): boolean {
    return (
      this.pads.some((pad) => pad.A) ||
      this.pads.some((pad) => pad.B) ||
      this.actionKeys.some((key) => key.isDown)
    )
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
