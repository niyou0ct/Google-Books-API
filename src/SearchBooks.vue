<template lang="pug">
.gb
  .gb-search-box
    h2.gb-search-box 書籍検索ボックス
    input(type="text" name="keyword" v-model="keywords")
    button(type="button" name="search" @click="fetchGoogleBookApi") 検索
  .gb-result
    ul.gb-list
      template(v-if="isThere")
        li.gb-list__item(v-for="(book, index) in bookItems" :key="index")
          template(v-if="book.imageLinks !== undefined && book.imageLinks.thumbnail !== undefined")
            img.gb-list__img(:src="book.imageLinks.thumbnail")
          h3.gb-list__title {{ book.title }}
          .gb-authors
            h4.gb-author(v-for="(author, authorIndex) in book.authors" :key="authorIndex") {{ author }}
          .gb-list__desc(v-if="book.description !== undefined") {{ book.description}}
      template(v-else)
        li 検索にヒットしませんでした
    .gb-loading(v-show="isLoading") 読み込み中
    .gb-api-error(v-show="isApiError") 通信エラーです
    button(v-if="canLoad" type="button" @click="loadMoreResults") Read More
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import axios from 'axios';
import { SearchBooksPayloadObj } from './store/search-book/types';
import SearchBookModule from './store/search-book/index';

@Component
export default class SearchBooks extends Vue {
  protected keywords: string = ''

  protected get bookItems(): any {
    return SearchBookModule.books;
  }

  protected get pageIndex(): number {
    return SearchBookModule.pageIndex;
  }

  protected get canLoad(): boolean {
    return SearchBookModule.loadable;
  }

  protected get searchedWord(): string {
    return SearchBookModule.keywords;
  }

  protected get isLoading(): boolean {
    return SearchBookModule.isLoading;
  }

  protected get isThere(): boolean {
    return SearchBookModule.isThere;
  }

  protected get isApiError(): boolean {
    return SearchBookModule.isApiError;
  }


  protected async fetchGoogleBookApi(): Promise<void> {
    await SearchBookModule.resetSearchBooks()
    SearchBookModule.setLoadingOrNot(true)
    SearchBookModule.setThereOrNot(true)

    const params: string = this.keywords.replace(/[\u{20}\u{3000}]/u, '+')
    const data: SearchBooksPayloadObj = {
      keywords: params,
      pageIndex: 0,
    };
    await SearchBookModule.getGoogleBooks(data)
    SearchBookModule.setSearchKeywords(data.keywords)
  }

  protected async loadMoreResults(): Promise<void> {
    SearchBookModule.setLoadingOrNot(true)
    const data: SearchBooksPayloadObj = {
      keywords: this.searchedWord,
      pageIndex: this.pageIndex,
    }
    await SearchBookModule.getGoogleBooks(data)
  }
}
</script>
