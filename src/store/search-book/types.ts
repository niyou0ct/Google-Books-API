export interface SearchBookState {
  keywords: string
  books: any
  totalItems: number
  pageIndex: number
  isLoading: boolean
  isThere: boolean
  isApiError: boolean
}

export interface SearchBooksPayloadObj {
  keywords: string
  pageIndex: number
}

export interface SetSearchBooksObj {
  totalItems: number
  books: any[]
}
