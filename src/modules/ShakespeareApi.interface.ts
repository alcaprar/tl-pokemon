export interface TranslateResponse {
  success: TranslateResponseSuccess
  contents: TranslateResponseContents
}

interface TranslateResponseSuccess {
  total: number
}

interface TranslateResponseContents {
  translated: string
  text: string
  translations: string
}