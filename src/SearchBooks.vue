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
    button(v-if="loadable" type="button" @click="loadMoreResults") Read More
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import axios from 'axios';
import { SearchBooksPayloadObj } from './store/search-book/types';
import SeachBookModule from './store/search-book/index';

@Component
export default class SearchBooks extends Vue {
  protected keywords: string = ''

  protected get bookItems(): any {
    console.log(SeachBookModule.books.length)
    return SeachBookModule.books;
  }

  protected get pageIndex(): number {
    return SeachBookModule.pageIndex;
  }

  protected get loadable(): boolean {
    return SeachBookModule.loadable;
  }

  protected get searchedWord(): string {
    return SeachBookModule.keywords;
  }

  protected get isLoading(): boolean {
    return SeachBookModule.isLoading;
  }

  protected get isThere(): boolean {
    return SeachBookModule.isThere;
  }

  protected setLoadingTrue(): void {
    SeachBookModule.setLoadingTrue()
  }

  protected async fetchGoogleBookApi(): Promise<void> {
    await SeachBookModule.resetSearchBooks()
    this.setLoadingTrue()
    SeachBookModule.setThereOrNot(true)

    const params: string = this.keywords.replace(/[\u{20}\u{3000}]/u, '+')
    const data: SearchBooksPayloadObj = {
      keywords: params,
      pageIndex: 0,
    };
    await SeachBookModule.getGoogleBooks(data)
    SeachBookModule.setSearchKeywords(data.keywords)
  }

  protected async loadMoreResults(): Promise<void> {
    this.setLoadingTrue()
    const data: SearchBooksPayloadObj = {
      keywords: this.searchedWord,
      pageIndex: this.pageIndex,
    }
    await SeachBookModule.getGoogleBooks(data)
  }
}
</script>
