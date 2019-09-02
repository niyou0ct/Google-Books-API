<template lang="pug">
.gb
  .gb-search-box
    h2.gb-search-box 書籍検索ボックス
    input(type="text" name="keyword" v-model="keywords")
    button(type="button" name="search" @click="fetchGoogleBookApi") 検索
  .gb-result
    ul.gb-list
      li.gb-list__item(v-if="bookItems.length > 0" v-for="(book, index) in bookItems" :key="index")
        img.gb-list__img(v-if="book.imageLinks.thumbnail !== undefined" :src="book.imageLinks.thumbnail")
        h3.gb-list__title {{ book.title }}
        .gb-authors
          h4.gb-author(v-for="(author, authorIndex) in book.authors" :key="authorIndex") {{ author }}
        .gb-list__desc(v-if="book.description !== undefined") {{ book.description}}
    .gb-loading(v-show="isLoading") 読み込み中
    button(v-if="loadable" type="button" @click="loadMoreResults") Read More
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import axios from 'axios';
import { SearchBooksPayloadObj } from './store/types';

@Component
export default class SearchBooks extends Vue {
  protected keywords: string = ''

  protected get bookItems(): any {
    return this.$store.state.books;
  }

  protected get pageIndex(): string {
    return this.$store.state.pageIndex;
  }

  protected get loadable(): boolean {
    return this.$store.getters.loadable;
  }

  protected get searchedWord(): string {
    return this.$store.state.keywords;
  }

  protected get isLoading(): string {
    return this.$store.state.isLoading;
  }

  protected setLoadingTrue(): void {
    this.$store.commit('setLoadingTrue');
  }

  protected async fetchGoogleBookApi(): Promise<void> {
    await this.$store.commit('resetSearchBooks');
    this.setLoadingTrue()

    const params: string = this.keywords.replace(/[\u{20}\u{3000}]/u, '+')
    const data: SearchBooksPayloadObj = {
      keywords: params,
      pageIndex: '0',
    };
    await this.$store.dispatch('getGoogleBooks', data);
    this.$store.commit('setSearchKeywords', data.keywords);
  }

  protected async loadMoreResults(): Promise<void> {
    this.setLoadingTrue()
    const data: SearchBooksPayloadObj = {
      keywords: this.searchedWord,
      pageIndex: this.pageIndex,
    }
    await this.$store.dispatch('getGoogleBooks', data);
  }
}
</script>
