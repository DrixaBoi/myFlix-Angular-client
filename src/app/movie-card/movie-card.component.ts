import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  
// movies variable is declared as an array. this is where movies returned
// from the API will be kept.
  movies: any[] = [];
  
  constructor(public fetchApiData: FetchApiDataService) { }

// getMovies function is called in the ngOnInit() lifecycle hook.
// ngOnInit is called when Angular is done creating the component.
  ngOnInit(): void {
    this.getMovies();
  }

// getMovies function is implemented and used to fetch movies from the FetchApiDataService
// with the help of getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

}
