import axios from 'axios'

const resultLists: any[] = []
let totalItem: number = 0

const fetchGoogleBookApi: any = async () => {
  const keywordElement = document.querySelector('input[name="keyword"]') as HTMLInputElement
  const { value } = keywordElement
  const params: string = value.replace(/[\u{20}\u{3000}]/u, '+')
  let bookLists: any[] = []

  const url: string = `https://www.googleapis.com/books/v1/volumes?q=intitle:${params}&maxResults=10&startIndex=0`
  const apiResponse: any = await axios
    .get(url)
    .then(response => response.data)
    .catch(error => window.alert(error))
  totalItem = apiResponse.totalItems
  
  apiResponse.items.forEach((item: any) => {
    let bookData: any = {
      title: '',
      subtitle: '',
      publisheData: '',
      description: '',
      imageLinks: ''
    }

    bookData.title = item.title
    bookData.subtitle = item.subtitle
    bookData.publisheData = item.publisheData
    bookData.description = item.description
    bookData.imageLinks = item.imageLinks.smallThumbnail

    bookLists.push(...bookData)
  })

  resultLists.push(bookLists)
}

const clickSearchButton = (): void => {
  const button = document.querySelector('button[name="search"]') as HTMLButtonElement

  button.addEventListener('click', fetchGoogleBookApi)
}

clickSearchButton()