import { types } from 'mobx-state-tree';
import { Parameters } from './models/Parameters';
import { WorkDay } from './models/WorkDay';

export const RootStore = types.model({
  parameters: types.optional(Parameters, Parameters.create()),
  workDay: types.optional(WorkDay, WorkDay.create({})),
});
