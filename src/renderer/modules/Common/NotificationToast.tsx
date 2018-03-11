import { Intent, Position, Toaster } from '@blueprintjs/core';

const toast = Toaster.create({
  className: 'my-toaster',
  position: Position.BOTTOM_RIGHT,
});

export default {
  showError(message: string) {
    console.error(message);
    toast.show({ message, intent: Intent.DANGER });
  },
  showInfo(message: string) {
    toast.show({ message, intent: Intent.PRIMARY });
  },
  showSuccess(message: string) {
    toast.show({ message, intent: Intent.SUCCESS });
  },
};
