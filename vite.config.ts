import { defineConfig } from "vite"
import replace from "@rollup/plugin-replace"

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      plugins: [
        //  Toggle the booleans here to enable / disable Phaser 3 features:
        replace({
          preventAssignment: true,
          "typeof CANVAS_RENDERER": "'true'",
          "typeof WEBGL_RENDERER": "'true'",
          "typeof EXPERIMENTAL": "'true'",
          "typeof PLUGIN_CAMERA3D": "'false'",
          "typeof PLUGIN_FBINSTANT": "'false'",
          "typeof FEATURE_SOUND": "'true'",
        }),
      ],
    },
  },
})
