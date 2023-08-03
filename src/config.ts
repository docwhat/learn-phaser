import Phaser from "phaser"

export default {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#d0f4f7",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}
