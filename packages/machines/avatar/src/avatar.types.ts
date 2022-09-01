import type { StateMachine as S } from "@zag-js/core"
import type { CommonProperties, RequiredBy, RootProperties } from "@zag-js/types"

type ElementIds = Partial<{
  trigger: string
  content: string
}>

type PublicContext = CommonProperties & {
  /**
   * The ids of the elements in the avatar. Useful for composition.
   */
  ids?: ElementIds
  /**
   * The fallback delay of the avatar.
   */
  fallbackDelay: number
  /**
   * Function called when the avatar image is loaded.
   */
  onImageLoad?: VoidFunction
  /**
   * Function called when the avatar image has failed.
   */
  onImageError?: VoidFunction
  /**
   * Custom label for the avatar.
   */
  "aria-label"?: string
}

export type UserDefinedContext = RequiredBy<PublicContext, "id">

type ComputedContext = Readonly<{
  /**
   * @computed Whether an `aria-label` is set.
   */
  readonly hasAriaLabel: boolean
}>

type PrivateContext = RootProperties & {}

export type MachineContext = PublicContext & ComputedContext & PrivateContext

export type MachineState = {
  value: "unknown" | "loading" | "loaded" | "fallback" | "error"
}

export type State = S.State<MachineContext, MachineState>

export type Send = S.Send<S.AnyEventObject>
