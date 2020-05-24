import { Component, OnInit } from '@angular/core';
import { FilmsService, Film } from '../../services/films.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css'],
})
export class FilmDetailComponent implements OnInit {
  film$: Observable<Film> = new Observable();

  constructor(private filmsService: FilmsService) {}

  ngOnInit(): void {
    this.film$ = this.filmsService.filmSelected$.pipe(filter((film) => !!film));
  }
}
