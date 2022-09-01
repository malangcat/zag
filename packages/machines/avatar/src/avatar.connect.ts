import { visuallyHiddenStyle } from "@zag-js/dom-utils"
import type { NormalizeProps, PropTypes } from "@zag-js/types"
import { dom } from "./avatar.dom"
import type { Send, State } from "./avatar.types"

export function connect<T extends PropTypes>(state: State, send: Send, normalize: NormalizeProps<T>) {
  const isLoaded = state.value === "loaded"
  const isFallback = state.value === "fallback" || state.value === "error"

  const imageId = dom.getImageId(state.context)
  const fallbackId = dom.getFallbackId(state.context)
  const badgeId = dom.getBadgeId(state.context)

  return {
    isLoaded,
    isFallback,
    rootProps: normalize.element({
      "data-part": "root",
      style: {
        position: "relative",
        width: "var(--avatar-size)",
        height: "var(--avatar-size)",
      },
    }),
    imageProps: normalize.img({
      "data-part": "image",
      "aria-label": state.context["aria-label"],
      id: imageId,
      onLoad() {
        send("IMAGE_LOAD")
      },
      onError() {
        send("IMAGE_ERROR")
      },
      style: isLoaded ? {} : visuallyHiddenStyle,
    }),
    fallbackProps: normalize.img({
      "data-part": "fallback",
      "aria-label": state.context["aria-label"],
      id: fallbackId,
      role: "img",
    }),
    badgeProps: normalize.element({
      "data-part": "badge",
      id: badgeId,
      style: {
        position: "absolute",
        width: "var(--badge-size)",
        height: "var(--badge-size)",
        top: "calc(var(--avatar-size) / 2 + var(--avatar-size) / 2.828 - var(--badge-size) / 2)",
        left: "calc(var(--avatar-size) / 2 + var(--avatar-size) / 2.828 - var(--badge-size) / 2)",
      },
    }),
  }
}
