import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilmsService, FavoriteSearch } from '../../services/films.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-search',
  templateUrl: './favorite-search.component.html',
  styleUrls: ['./favorite-search.component.css'],
})
export class FavoriteSearchComponent implements OnInit {
  favoritesSearch$: Observable<FavoriteSearch[]>;

  constructor(private filmsService: FilmsService) {}

  ngOnInit(): void {
    this.favoritesSearch$ = this.filmsService.favoritesSearch$.pipe(
      map((favoritesSearch) =>
        favoritesSearch
          .sort((a, b) =>
            a.counter < b.counter ? 1 : a.counter > b.counter ? -1 : 0
          )
          .slice(0, 3)
      )
    );
  }

  clickFavoriteSearch(favoriteSearch: FavoriteSearch) {
    this.filmsService.search$.next(favoriteSearch.search);
  }
}
