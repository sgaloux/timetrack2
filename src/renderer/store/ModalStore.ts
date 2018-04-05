import { types } from 'mobx-state-tree';
import { ConfirmModalModel } from './models';

export const ModalStore = types.model({
  confirm: types.optional(
    ConfirmModalModel,
    ConfirmModalModel.create({
      isOpen: false,
      title: '',
      content: '',
    }),
  ),
});

export type ModalStoreType = typeof ModalStore.Type;
