export interface Country {
  borders: string[];
  capital: string;
  currencies: any[];
  flag: string;
  languages: any[];
  name: string;
  population: number;
  region: string;
  isFavorite: boolean;
  alpha3Code: string;
}

export interface Region {
  name: string;
  countries: Country[];
}
