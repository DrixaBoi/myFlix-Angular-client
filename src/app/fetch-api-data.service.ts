import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiURL = 'https://drixflix.herokuapp.com/';
// Injectable decorator, function that augments a piece of code.
// In this case were using it to tell Angular that this service will be available everywhere. (hence the root)
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  // Observable<any> makes the method's return explicit by saying "we return this type"
  // Giving the Typescript compiler information it can deduce about types
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    // The .pipe function is used to combine multiple functions into a single function
    return this.http.post(apiURL + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiURL + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'movies/:title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getAllDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'directors', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'directors/:directorName', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getAllGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'genres', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'genres/:genre', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiURL + 'users/:Username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUserFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + `users/${username}/favorites`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.post(apiURL + `users/${user.Username}/movies/${movieId}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      ),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUser(users: object): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.put(apiURL + `users/${user.Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteFavoriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.delete(apiURL + `users/${user.Username}/movies/${movieId}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiURL + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  

  private extractResponseData(data: any | Object): any {
    return data || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}


