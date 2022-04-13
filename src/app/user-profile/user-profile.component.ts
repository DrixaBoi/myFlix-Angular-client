import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user
    });
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('You successfully updated your profile.', 'OK', {
        duration: 2000
      });
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
