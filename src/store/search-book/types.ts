export interface SearchBookState {
  keywords: string
  books: any
  totalItems: number
  pageIndex: number
  isLoading: boolean
  isError: boolean
}

export interface SearchBooksPayloadObj {
  keywords: string
  pageIndex: number
}

export interface SetSearchBooksObj {
  totalItems: number
  books: any[]
}
