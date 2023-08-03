export class MoveKeys {
  private scene: Phaser.Scene
  private ups: (() => boolean)[] = []
  private downs: (() => boolean)[] = []
  private lefts: (() => boolean)[] = []
  private rights: (() => boolean)[] = []
  private actions: (() => boolean)[] = []
  private unactions: (() => boolean)[] = []

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
    const addKey = (key: number) => {
      const k = this.scene.input.keyboard!.addKey(key)
      return () => k.isDown
    }

    this.ups.push(addKey(codes.UP))
    this.ups.push(addKey(codes.W))
    this.downs.push(addKey(codes.DOWN))
    this.downs.push(addKey(codes.S))
    this.lefts.push(addKey(codes.LEFT))
    this.lefts.push(addKey(codes.A))
    this.rights.push(addKey(codes.RIGHT))
    this.rights.push(addKey(codes.D))

    this.actions.push(addKey(codes.SPACE))
    this.actions.push(addKey(codes.ENTER))
    this.actions.push(addKey(codes.SHIFT))

    this.unactions.push(addKey(codes.ESC))
    this.unactions.push(addKey(codes.BACKSPACE))
  }

  initGamepads() {
    if (!this.scene.input.gamepad?.total) {
      this.scene.input.gamepad?.on("connected", this.initOneGamepad, this)
      this.scene.input.gamepad?.gamepads.forEach(this.initOneGamepad, this)
    }
  }

  initOneGamepad(pad: Phaser.Input.Gamepad.Gamepad) {
    const p = pad
    this.ups.push(() => p.up)
    this.downs.push(() => p.down)
    this.lefts.push(() => p.left)
    this.rights.push(() => p.right)
    this.actions.push(() => p.A)
    this.unactions.push(() => p.B)
  }

  up(): boolean {
    return this.ups.some((up) => up())
  }
  down(): boolean {
    return this.downs.some((f) => f())
  }
  left(): boolean {
    return this.lefts.some((f) => f())
  }
  right(): boolean {
    return this.rights.some((f) => f())
  }
  action(): boolean {
    return this.actions.some((f) => f())
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
