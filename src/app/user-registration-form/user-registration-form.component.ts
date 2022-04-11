import { Component, OnInit, Input } from '@angular/core';
//this import closes dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//this import bring the API calls I created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
//this import is used to display the notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  //decorator that defines the component's input
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  //This function is responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //Logic for a successful user registration here
      this.dialogRef.close(); //this closes the modal on success
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
