import { RootState } from './types';

const getters: any = {
  books(state: any) {
    return state.books;
  },
  loadable(state: RootState) {
    return state.totalItems > state.books.length
  },
};

export default getters;
