import { MutationTree } from 'vuex';
import { SetSearchBooksObj, RootState } from './types';

const mutations: MutationTree<any> = {
  setSearchBooks: (state: RootState, payload: SetSearchBooksObj) => {
    payload.books.forEach((book: any) => {
      state.books.push(book)
    })
    state.pageIndex += 1;
    state.totalItems = payload.totalItems;
  },
  setSearchKeywords: (state: RootState, payload: string) => {
    state.keywords = payload
  },
  resetSearchBooks: (state: RootState) => {
    state.keywords = ''
    state.books = []
    state.totalItems = 0
    state.pageIndex = 0
  },
  setLoadingFalse: (state: RootState) => {
    state.isLoading = false
  },
  setLoadingTrue: (state: RootState) => {
    state.isLoading = true
  },
};

export default mutations;
