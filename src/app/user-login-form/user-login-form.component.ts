import { Component, OnInit, Input } from '@angular/core';
//this import closes dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//this import bring the API calls I created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
//this import is used to display the notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  //decorator that defines the component's input
  @Input() userInfo = { Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  //This function is responsible for sending the form inputs to the backend
  userLogin(): void {
    this.fetchApiData.userLogin(this.userInfo).subscribe((result) => {
      console.log(result);
      //this occures after successful user login
      localStorage.setItem('token', result.token);
      localStorage.setItem('UserId', result.user._id);
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log(result.user);
      //closes the modal on successful login
      this.dialogRef.close();
      this.snackBar.open('You have been logged in successfully.', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open('There was a problem, please check your username and password and try again', 'OK', {
        duration: 2000
      });
    });
  }

}
