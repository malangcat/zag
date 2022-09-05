import { visuallyHiddenStyle } from "@zag-js/dom-utils"
import type { NormalizeProps, PropTypes } from "@zag-js/types"
import { dom } from "./avatar.dom"
import type { Send, State } from "./avatar.types"

export function connect<T extends PropTypes>(state: State, send: Send, normalize: NormalizeProps<T>) {
  const isLoaded = state.value === "loaded"
  const isFallback = state.value === "fallback" || state.value === "error"

  const imageId = dom.getImageId(state.context)
  const fallbackId = dom.getFallbackId(state.context)

  return {
    isLoaded,
    isFallback,
    rootProps: normalize.element({
      "data-part": "root",
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
  }
}
