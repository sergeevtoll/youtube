export enum FAVOURIT {
  QUERY = 'query',
  NAME = 'name',
  SORT = 'sort',
  MAX = 'max',
}

export type FAVOURIT_DATA = {
  id: string
  [FAVOURIT.QUERY]: string
  [FAVOURIT.NAME]: string
  [FAVOURIT.SORT]: string
  [FAVOURIT.MAX]: string
}

export interface Auth {
  auth: boolean
}

export interface Favourites {
  list: FAVOURIT_DATA[]
}

export type State = {
  favourites: Favourites
  auth: Auth
}
