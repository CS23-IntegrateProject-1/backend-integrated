export enum Genre {
  Action,
  Adventure,
  Animation,
  Comedy,
  Crime,
  Drama,
  Fantasy,
  Horror,
  Mystery,
  Romance,
  Sci_Fi,
  Thriller,
  War,
  Western,
  Documentary,
  Musical,
  Historical,
  Superhero,
  Family,
}

export interface Film {
  filmId: number;
  name: string;
  genre: Genre;
  language: string;
  synopsis: string;
  release_date: string;
  duration: number;
  poster_img: string;
  rate: number;
}

export interface RecievedFilm {
  filmId: number;
  name: string;
  genre: Genre;
  language: string;
  synopsis: string;
  releaseDate: string;
  duration: number;
  posterImg: string;
  rate: number;
}
