import { ActionTree } from 'vuex';
import axios from 'axios';
import { SearchBooksPayloadObj, SetSearchBooksObj } from './types';

const fetchGoogleBooksApi: (payload: SearchBooksPayloadObj) => Promise<{ data: any } | { error: any }> = async (payload: SearchBooksPayloadObj): Promise<{ data: any } | { error: any }> => {
  const url: string = `https://www.googleapis.com/books/v1/volumes?q=intitle:${payload.keywords}&maxResults=10&startIndex=${payload.pageIndex}`;
  return axios
    .get(url)
    .then((response) => {
      const { data } = response;
      return { data };
    })
    .catch((error) => ({ error }));
};

const actions: ActionTree<any, any> = {
  getGoogleBooks: async ({ commit }, payload: SearchBooksPayloadObj) => {
    const { data, error }: any = await fetchGoogleBooksApi(payload);
    commit('setLoadingFalse');

    if (data) {
      const info: SetSearchBooksObj = {
        totalItems: 0,
        books: [],
      };
      info.totalItems = data.totalItems;
      info.books = data.items.map((item: any) => item.volumeInfo);
      commit('setSearchBooks', info);
    } else {
      commit('resetSearchBooks');
    }
  },
};

export default actions;
