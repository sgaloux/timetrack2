import { Position, Toaster } from "@blueprintjs/core";

export const NotificationToast = Toaster.create({
  className: "my-toaster",
  position: Position.BOTTOM_RIGHT,
});