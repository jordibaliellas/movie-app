import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { FavoriteSearchComponent } from './components/favorite-search/favorite-search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavoriteSearchComponent,
    SearchResultComponent,
    FilmDetailComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
