import axios from 'axios';
import { SearchBooksPayloadObj } from '../store/search-book/types';

export default class ApiMethods {
  public fetchGoogleBooksApi: (payload: SearchBooksPayloadObj) => Promise<{ data: any } | { error: any }> = async (payload: SearchBooksPayloadObj): Promise<{ data: any } | { error: any }> => {
    const url: string = `https://www.googleapis.com/books/v1/volumes?q=intitle:${payload.keywords}&maxResults=10&startIndex=${payload.pageIndex}`;
    return axios
      .get(url)
      .then((response) => {
        const { data } = response;
        return { data };
      })
      .catch((error) => ({ error }));
  };
}


