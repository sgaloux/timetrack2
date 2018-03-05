import { types, flow } from 'mobx-state-tree';
import $ from 'jquery';
import axios from 'axios';
import { GetParameters } from '../utils';

const InflowType = types.model({
  id: types.string,
  name: types.string,
});

export const InflowStore = types
  .model({
    inflowTypes: types.optional(types.array(InflowType), []),
  })
  .actions((self) => {
    const loadInflowTypes = flow(function*() {
      try {
        const { inflowPassword, inflowUrl, inflowUser } = GetParameters(self);
        let response = yield axios.get(`${inflowUrl}/types/perf`, {
          headers: {
            'Content-Type': 'application/xml',
            Authorization: 'Basic ' + btoa(inflowUser + ':' + inflowPassword),
          },
          withCredentials: true,
          responseType: 'document',
        });
        console.log('Data fetched', response.data);
      } catch (error) {
        console.error('Unable to fetch inflowTypes', error);
      }
    });

    return { loadInflowTypes };
  });
