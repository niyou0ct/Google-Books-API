import axios from 'axios'

const fetchGoogleBookApi: any = () => {
  const keywordElement = document.querySelector('input[name="keyword"]') as HTMLInputElement
  const { value } = keywordElement
  const url: string = `https://www.googleapis.com/books/v1/volumes?q=intitle:${value}`
  const apiResponse: any = axios
    .get(url)
    .then(response => console.log(response))
    .catch(error => window.alert(error))
}

const clickSearchButton = (): void => {
  const button = document.querySelector('button[name="search"]') as HTMLButtonElement

  button.addEventListener('click', fetchGoogleBookApi)
}

clickSearchButton()