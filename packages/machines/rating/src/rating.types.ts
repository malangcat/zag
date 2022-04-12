import { Context } from "@zag-js/types"

type IntlMessages = {
  /**
   * Returns a human readable value for the rating.
   */
  ratingValueText(index: number): string
}

type IdMap = Partial<{
  root: string
  label: string
  input: string
  itemGroup: string
  item(id: string): string
}>

export type MachineContext = Context<{
  /**
   * The ids of the elements in the rating. Useful for composition.
   */
  ids?: IdMap
  /**
   * Specifies the localized strings that identifies the accessibility elements and their states
   */
  messages: IntlMessages
  /**
   * The maximum rating value.
   */
  max: number
  /**
   * The name attribute of the rating element (used in forms).
   */
  name?: string
  /**
   * The current rating value.
   */
  value: number
  /**
   * The initial rating value.
   */
  initialValue: number
  /**
   * @internal The value of the hovered rating.
   */
  hoveredValue: number
  /**
   * Whether the rating is readonly.
   */
  readonly?: boolean
  /**
   * Whether the rating is disabled.
   */
  disabled?: boolean
  /**
   * Whether to allow half stars.
   */
  allowHalf?: boolean
  /**
   * Whether to autofocus the rating.
   */
  autoFocus?: boolean
  /**
   * Function to be called when the rating value changes.
   */
  onChange?: (details: { value: number }) => void
  /**
   * Function to be called when the rating value is hovered.
   */
  onHover?: (details: { value: number }) => void
  /**
   * @computed Whether the rating is interactive
   */
  readonly isInteractive: boolean
  /**
   * @computed Whether the pointer is hovering over the rating
   */
  readonly isHovering: boolean
}>

export type MachineState = {
  value: "unknown" | "idle" | "hover" | "focus"
}
