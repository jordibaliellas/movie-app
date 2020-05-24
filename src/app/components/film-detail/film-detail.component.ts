import { Component, OnInit } from '@angular/core';
import { FilmsService, Film, FilmDetail } from '../../services/films.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css'],
})
export class FilmDetailComponent implements OnInit {
  film$: Observable<FilmDetail> = new Observable();

  constructor(private filmsService: FilmsService) {}

  ngOnInit(): void {
    this.film$ = this.filmsService.filmSelected$.pipe(
      filter((film) => !!film),
      mergeMap((film) => this.filmsService.getFilmById(film.imdbID))
    );
  }
}
