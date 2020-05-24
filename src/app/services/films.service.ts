import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, mergeMap, filter, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ResponseOmdb {
  Search: Film[];
  totalResults: string;
  Response: string;
}

export interface FilmDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    }
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface ResponseFilms {
  search: Film[];
  totalResults: number;
  response: boolean;
}

export interface Film {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface FavoriteSearch {
  search: string;
  counter: number;
}

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  search$ = new BehaviorSubject<string>('');
  listFilms$: Observable<ResponseFilms>;
  favoritesSearch$ = new BehaviorSubject<FavoriteSearch[]>([]);
  filmSelected$ = new BehaviorSubject<Film>(undefined);
  canClickStar$ = new BehaviorSubject<boolean>(false);
  searchIsFavorite$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.listFilms$ = this.search$.pipe(
      debounceTime(200),
      tap((search) => {
        const favoritesSearch = this.favoritesSearch$.value;
        const favoriteSearch = favoritesSearch.find(
          (item) => item.search === search
        );

        if (favoriteSearch) {
          this.searchIsFavorite$.next(true);
          favoriteSearch.counter++;
          this.favoritesSearch$.next(favoritesSearch);
        } else {
          this.searchIsFavorite$.next(false);
        }
      }),
      mergeMap((search) => this.getFilms(search)),
      tap((result) => {
        this.canClickStar$.next(
          result && result.response && result.totalResults > 0
        );
      })
    );
  }

  getFilms(search: string): Observable<ResponseFilms> {
    if (search.replace(/\s/g, '').length === 0) {
      return of({ search: [], totalResults: 0, response: false });
    }

    return this.http
      .get<ResponseOmdb>(
        `${environment.urlOmdbApi}?s=${search}&apikey=${environment.apiKeyOmdbApi}`
      )
      .pipe(
        map((response) => ({
          search: response.Search,
          totalResults: Number(response.totalResults),
          response: response.Response === 'True',
        }))
      );
  }

  getFilmById(id: string): Observable<FilmDetail> {
    return this.http.get<FilmDetail>(
      `${environment.urlOmdbApi}?i=${id}&apikey=${environment.apiKeyOmdbApi}`
    );
  }
}
