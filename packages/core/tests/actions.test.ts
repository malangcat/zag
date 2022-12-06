import { createMachine } from "../src"

test("[final state] exit actions should be called when invoked machine reaches its final state", (done) => {
  const exit_root = jest.fn()
  const exit_state = jest.fn()

  const machine = createMachine({
    exit: exit_root,
    initial: "a",
    states: {
      a: {
        type: "final",
        exit: exit_state,
      },
    },
  })

  machine
    .onDone(() => {
      done()
    })
    .start()

  expect(exit_root).toHaveBeenCalled()
  expect(exit_state).toHaveBeenCalled()
})

test("exit actions should be called when stopping a machine", () => {
  const exit_root = jest.fn()
  const exit_state = jest.fn()

  const machine = createMachine({
    exit: exit_root,
    initial: "a",
    states: {
      a: {
        exit: exit_state,
      },
    },
  })

  machine.start().stop()

  expect(exit_root).toBeTruthy()
  expect(exit_state).toBeTruthy()
})

test("state should be after transition", () => {
  let result = null
  const on_transition = (_ctx, _evt, { state }) => {
    result = state.value
  }

  const machine = createMachine(
    {
      initial: "a",
      states: {
        a: {
          on: {
            TRANSITION: {
              target: "b",
              actions: "onTransisition",
            },
          },
        },
        b: {},
      },
    },
    {
      actions: {
        onTransisition: on_transition,
      },
    },
  )

  machine.start()
  machine.send({ type: "TRANSITION" })

  expect(result).toBe("b")
})
