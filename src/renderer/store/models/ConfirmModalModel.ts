import { types } from 'mobx-state-tree';

export const ConfirmModalModel = types
  .model('ConfirmModalModel', {
    isOpen: false,
    title: '',
    content: '',
  })
  .actions((self) => {
    let scopeResolve: any;

    function show(title: string, content: string) {
      self.title = title;
      self.content = content;
      self.isOpen = true;
      return new Promise<boolean>((resolve) => {
        scopeResolve = resolve;
      });
    }

    function confirm() {
      self.isOpen = false;
      scopeResolve(true);
    }

    function cancel() {
      self.isOpen = false;
      scopeResolve(false);
    }

    return {
      show,
      cancel,
      confirm,
    };
  });