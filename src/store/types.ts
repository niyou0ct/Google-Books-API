export interface RootState {
  keywords: string
  books: any
  totalItems: number
  pageIndex: number
  isLoading: boolean
  isError: boolean
}

export interface SearchBooksPayloadObj {
  keywords: string
  pageIndex: string
}

export interface SetSearchBooksObj {
  totalItems: number
  books: any[]
}
