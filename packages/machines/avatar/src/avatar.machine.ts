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

      activities: ["trackSrcChange"],

      states: {
        unknown: {
          on: {
            SETUP: "loading",
          },
        },

        loading: {
          activities: ["trackImageLoad"],
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
          activities: ["trackImageLoad"],
          on: {
            IMAGE_LOAD: "loaded",
            IMAGE_ERROR: "error",
            SRC_CHANGE: "loading",
          },
        },

        error: {
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
          return observeAttributes(img, ["src", "srcSet"], () => {
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
        invokeOnImageLoad(ctx) {
          ctx.onImageLoad?.()
        },
        invokeOnImageError(ctx) {
          ctx.onImageError?.()
        },
      },
      delays: {
        FALLBACK_DELAY: (ctx) => ctx.fallbackDelay,
      },
    },
  )
}
