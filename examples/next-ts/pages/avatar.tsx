import * as avatar from "@zag-js/avatar"
import { normalizeProps, useMachine } from "@zag-js/react"
import { avatarControls } from "@zag-js/shared"
import { useId, useState } from "react"
import { StateVisualizer } from "../components/state-visualizer"
import { Toolbar } from "../components/toolbar"
import { useControls } from "../hooks/use-controls"

export default function Page() {
  const controls = useControls(avatarControls)
  const [state, send] = useMachine(
    avatar.machine({
      id: useId(),
    }),
    {
      context: controls.context,
    },
  )
  const [delay, setDelay] = useState(300)
  const [src, setSrc] = useState(`https://deelay.me/${delay}/https://avatars.githubusercontent.com/u/6916170`)
  const updateSrc = () => {
    setSrc(`https://deelay.me/${delay}/https://avatars.githubusercontent.com/u/6916170?${Date.now()}`)
  }

  const api = avatar.connect(state, send, normalizeProps)

  return (
    <>
      <main className="avatar">
        <span {...api.rootProps}>
          <img data-testid="image" src={src} alt="malangcat avatar" {...api.imageProps} />
          {api.isFallback && (
            <div data-testid="fallback" {...api.fallbackProps}>
              SA
            </div>
          )}
          <div {...api.badgeProps}></div>
        </span>
        <div>
          <input value={delay} onChange={(e) => setDelay(+e.currentTarget.value)} type="number" />
          <button onClick={updateSrc}>Set delay and reload</button>
        </div>
      </main>
      <Toolbar controls={controls.ui}>
        <StateVisualizer state={state} />
      </Toolbar>
    </>
  )
}
