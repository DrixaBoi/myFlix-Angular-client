import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  
/** movies variable is declared as an array. this is where movies returned
* from the API will be kept.
*/
  movies: any[] = [];
  favoriteMovies: any [] = [];
  
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

/** getMovies function is called in the ngOnInit() lifecycle hook.
* ngOnInit is called when Angular is done creating the component.
*/
  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

/** getMovies function is implemented and used to fetch movies from the FetchApiDataService
*  with the help of getAllMovies()
*/
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

/** getUserFavorites function uses getUser method to populate the users favorites array */
  getUserFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  // Opens user profile
  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '300px'
    });
  }

  // opens Movie description "aka: synopsis" card
  openSynopsisCard(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
   
  }

  // Opens Director Card
  openDirectorCard(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '500px',
    });
  }

  // opens Genre Card
  openGenreCard(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '500px'
    });
  }

  //function for (click) to add movieID to user favorites array
  addFavoriteMovie(movieID: any, title: string): void {
    console.log(movieID);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavoriteMovie(movieID).subscribe((result: any) => {
      console.log(result);
      this.snackBar.open(
        `${title} has been added to your favorites`, 'OK', 
        {
          duration: 3000,
        });
      this.ngOnInit();
    });
    return this.getUserFavorites();
  }
    
  // function for users to delete movieID movies from their favorites
  DeleteFavoriteMovie(movieID: string, title: string): void {
    console.log(movieID);
    this.fetchApiData.deleteFavoriteMovie(movieID).subscribe((result: any) => {
    console.log(result);
    this.snackBar.open(
      `${title} has been removed from your favorites`, 'OK',
      {
        duration: 3000,
      }
    );
    this.ngOnInit();
    });
    return this.getUserFavorites();
  }

}
