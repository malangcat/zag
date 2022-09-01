import { createMachine } from "@zag-js/core"
import { observeAttributes } from "@zag-js/dom-utils"
import { dom } from "./avatar.dom"
import type { MachineContext, MachineState, UserDefinedContext } from "./avatar.types"

export function machine(ctx: UserDefinedContext) {
  return createMachine<MachineContext, MachineState>(
    {
      id: "avatar",
      initial: "unknown",

      context: {
        fallbackDelay: 0,
        ...ctx,
      },

      computed: {
        hasAriaLabel: (ctx) => !!ctx["aria-label"],
      },

      states: {
        unknown: {
          on: {
            SETUP: "loading",
          },
        },

        loading: {
          activities: ["trackSrcChange", "trackImageLoad"],
          after: {
            FALLBACK_DELAY: "fallback",
          },
          on: {
            IMAGE_LOAD: "loaded",
            IMAGE_ERROR: "error",
            SRC_CHANGE: "loading",
          },
        },

        loaded: {
          activities: ["trackSrcChange"],
          entry: ["invokeOnImageLoad"],
          on: {
            SRC_CHANGE: "loading",
          },
        },

        fallback: {
          activities: ["trackSrcChange", "trackImageLoad"],
          on: {
            IMAGE_LOAD: "loaded",
            IMAGE_ERROR: "error",
            SRC_CHANGE: "loading",
          },
        },

        error: {
          activities: ["trackSrcChange"],
          entry: ["invokeOnImageError"],
          on: {
            SRC_CHANGE: "loading",
          },
        },
      },
    },
    {
      activities: {
        trackSrcChange(ctx, _evt, { send }) {
          const img = dom.getImageEl(ctx)
          return observeAttributes(img, "src", () => {
            return send("SRC_CHANGE")
          })
        },
        trackImageLoad(ctx, _evt, { send }) {
          const img = dom.getImageEl(ctx)
          if (img?.complete) {
            if (img?.naturalHeight > 0) {
              send("IMAGE_LOAD")
            } else {
              send("IMAGE_ERROR")
            }
          }
        },
      },
      actions: {
        invokeOnImageLoad(ctx, _evt) {
          ctx.onImageLoad?.()
        },
        invokeOnImageError(ctx, _evt) {
          ctx.onImageError?.()
        },
      },
      delays: {
        FALLBACK_DELAY: (ctx) => ctx.fallbackDelay,
      },
    },
  )
}
