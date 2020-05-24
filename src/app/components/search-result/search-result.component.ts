import { Component, OnInit } from '@angular/core';
import {
  FilmsService,
  ResponseFilms,
  Film,
} from '../../services/films.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  listFilms$: Observable<ResponseFilms>;

  constructor(private filmService: FilmsService) {}

  ngOnInit(): void {
    this.listFilms$ = this.filmService.listFilms$;
  }

  clickFilm(film: Film) {
    this.filmService.filmSelected$.next(film);
  }
}
