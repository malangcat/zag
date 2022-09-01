"use strict";

var _xstate = require("xstate");

const {
  actions,
  createMachine,
  assign
} = _xstate;
const {
  choose
} = actions;
const fetchMachine = createMachine({
  id: "avatar",
  initial: "unknown",
  context: {},
  on: {
    UPDATE_CONTEXT: {
      actions: "updateContext"
    }
  },
  states: {
    unknown: {
      on: {
        SETUP: "loading"
      }
    },
    loading: {
      activities: ["trackSrcChange", "trackImageLoad"],
      after: {
        FALLBACK_DELAY: "fallback"
      },
      on: {
        IMAGE_LOAD: "loaded",
        IMAGE_ERROR: "error",
        SRC_CHANGE: "loading"
      }
    },
    loaded: {
      activities: ["trackSrcChange"],
      entry: ["invokeOnImageLoad"],
      on: {
        SRC_CHANGE: "loading"
      }
    },
    fallback: {
      activities: ["trackSrcChange", "trackImageLoad"],
      on: {
        IMAGE_LOAD: "loaded",
        IMAGE_ERROR: "error",
        SRC_CHANGE: "loading"
      }
    },
    error: {
      activities: ["trackSrcChange"],
      entry: ["invokeOnImageError"],
      on: {
        SRC_CHANGE: "loading"
      }
    }
  }
}, {
  actions: {
    updateContext: assign((context, event) => {
      return {
        [event.contextKey]: true
      };
    })
  },
  guards: {}
});