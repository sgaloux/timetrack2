import { types } from "mobx-state-tree";

const ConfirmModal = types
  .model({
    isOpen: false,
    title: "",
    content: "",
  })
  .actions((self) => {
    let scopeResolve: any;

    function show(title: string, content: string) {
      self.title = title;
      self.content = content;
      self.isOpen = true;
      return new Promise<boolean>((resolve, reject) => {
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

export const ModalStore = types.model({
  confirm: types.optional(
    ConfirmModal,
    ConfirmModal.create({
      isOpen: false,
      title: "",
      content: "",
    }),
  ),
});
