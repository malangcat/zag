import { defineDomHelpers } from "@zag-js/dom-utils"
import type { MachineContext as Ctx } from "./avatar.types"

export const dom = defineDomHelpers({
  getRootId: (ctx: Ctx) => ctx.ids?.trigger ?? `avatar:${ctx.id}`,
  getImageId: (ctx: Ctx) => ctx.ids?.trigger ?? `avatar:${ctx.id}:image`,
  getFallbackId: (ctx: Ctx) => ctx.ids?.content ?? `avatar:${ctx.id}:fallback`,
  getBadgeId: (ctx: Ctx) => `avatar:${ctx.id}:badge`,

  getRootEl: (ctx: Ctx) => dom.getById(ctx, dom.getRootId(ctx)),
  getImageEl: (ctx: Ctx) => dom.getById<HTMLImageElement>(ctx, dom.getImageId(ctx)),
  getFallbackEl: (ctx: Ctx) => dom.getById(ctx, dom.getFallbackId(ctx)),
  getBadgeEl: (ctx: Ctx) => dom.getById(ctx, dom.getBadgeId(ctx)),
})
