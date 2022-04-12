import { Context } from "@zag-js/types"

type IdMap = Partial<{
  root: string
  thumb: string
  control: string
  track: string
  range: string
  label: string
  output: string
}>

export type MachineContext = Context<{
  /**
   * The ids of the elements in the slider. Useful for composition.
   */
  ids: IdMap
  /**
   * The value of the slider
   */
  value: number
  /**
   * The value of the slider when it was initially rendered.
   * Used when the `form.reset(...)` is called.
   */
  initialValue: number | null
  /**
   * The name associated with the slider (when used in a form)
   */
  name?: string
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean
  /**
   * Whether the slider is read-only
   */
  readonly?: boolean
  /**
   * Whether the slider value is invalid
   */
  invalid?: boolean
  /**
   * @computed Whether the slider is interactive
   */
  readonly isInteractive: boolean
  /**
   * The minimum value of the slider
   */
  min: number
  /**
   * The maximum value of the slider
   */
  max: number
  /**
   * The step value of the slider
   */
  step: number
  /**
   * @internal The move threshold of the slider thumb before it is considered to be moved
   */
  threshold: number
  /**
   * The orientation of the slider
   */
  orientation?: "vertical" | "horizontal"
  /**
   * - "start": Useful when the value represents an absolute value
   * - "center": Useful when the value represents an offset (relative)
   */
  origin?: "start" | "center"
  /**
   * The aria-label of the slider. Useful for providing an accessible name to the slider
   */
  "aria-label"?: string
  /**
   * The `id` of the element that labels the slider. Useful for providing an accessible name to the slider
   */
  "aria-labelledby"?: string
  /**
   * Whether to focus the slider thumb after interaction (scrub and keyboard)
   */
  focusThumbOnChange?: boolean
  /**
   * Function that returns a human readable value for the slider
   */
  getAriaValueText?(value: number): string
  /**
   * Function invoked when the value of the slider changes
   */
  onChange?(details: { value: number }): void
  /**
   * Function invoked when the slider value change is done
   */
  onChangeEnd?(details: { value: number }): void
  /**
   * Function invoked when the slider value change is started
   */
  onChangeStart?(details: { value: number }): void
  /**
   * @internal The slider thumb dimensions
   */
  thumbSize: { width: number; height: number } | null
  /**
   * @internal Whether the thumb size has been measured
   */
  readonly hasMeasuredThumbSize: boolean
  /**
   * @computed Whether the slider is horizontal
   */
  readonly isHorizontal: boolean
  /**
   * @computed Whether the slider is vertical
   */
  readonly isVertical: boolean
  /**
   * @computed Whether the slider is in RTL mode
   */
  readonly isRtl: boolean
}>

export type SharedContext = {
  min: number
  max: number
  step: number
  dir?: "ltr" | "rtl"
  isRtl: boolean
  isVertical: boolean
  isHorizontal: boolean
  value: number
  thumbSize: { width: number; height: number } | null
  orientation?: "horizontal" | "vertical"
  readonly hasMeasuredThumbSize: boolean
}

export type MachineState = {
  value: "unknown" | "idle" | "dragging" | "focus"
}
