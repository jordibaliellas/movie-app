import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { filter, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  star = true;

  inputSearch = '';

  canClickStar$: BehaviorSubject<boolean>;
  searchIsFavorite$: BehaviorSubject<boolean>;

  constructor(private filmsService: FilmsService) {}

  ngOnInit(): void {
    this.filmsService.search$
      .pipe(filter((search) => search !== this.inputSearch))
      .subscribe((search) => {
        this.inputSearch = search;
      });

    this.canClickStar$ = this.filmsService.canClickStar$;
    this.searchIsFavorite$ = this.filmsService.searchIsFavorite$;
  }

  search() {
    this.filmsService.search$.next(this.inputSearch);
  }

  clickStar() {
    if (!this.canClickStar$.value) {
      return;
    }

    this.filmsService.searchIsFavorite$.next(true);

    const favoritesSearch = this.filmsService.favoritesSearch$.value;

    const indexFavoriteSearch = favoritesSearch.findIndex(
      (favoriteSearch) => favoriteSearch.search === this.inputSearch
    );

    if (indexFavoriteSearch === -1) {
      favoritesSearch.push({ search: this.inputSearch, counter: 1 });
    } else {
      favoritesSearch[indexFavoriteSearch].counter++;
    }

    this.filmsService.favoritesSearch$.next(favoritesSearch);
  }
}
