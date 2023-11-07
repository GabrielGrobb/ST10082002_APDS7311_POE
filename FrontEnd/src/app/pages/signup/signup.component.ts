import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username = new FormControl('', [
    Validators.required, 
    Validators.minLength(4), 
    Validators.maxLength(30)]);

  firstName = new FormControl('', [
    Validators.required, 
    Validators.maxLength(30),
    Validators.pattern('^[a-zA-Z ]*$'),]);

  lastName = new FormControl('', [
    Validators.required, 
    Validators.maxLength(30),
    Validators.pattern('^[a-zA-Z ]*$'),]);

  password = new FormControl('', [
    Validators.required, 
    Validators.minLength(4), 
    Validators.maxLength(30)]);

  age = new FormControl(null ,[
    Validators.required, 
    Validators.min(16), 
    Validators.max(99)]);

  confirmPassword = new FormControl('', [
    Validators.required, 
    Validators.minLength(4), 
    Validators.maxLength(30)]);

  hasError = false;
  errorMessage = '';

  isUsernameValid = false;
  isFirstNameValid = false;
  isLastNameValid = false;
  isAgeValid = false;
  isPasswordValid = false;
  isConfirmPasswordValid = false

  constructor(private router: Router, public auth: AuthServiceService){}

  ngOnInit(): void{
    this.username.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isUsernameValid = !this.username.invalid;
    });

    this.firstName.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isFirstNameValid = !this.firstName.invalid;
    });

    this.lastName.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isLastNameValid = !this.lastName.invalid;
    });

    this.age.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isAgeValid = !this.age.invalid;
    });

    this.password.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isPasswordValid = !this.password.invalid;
    });

    this.confirmPassword.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isConfirmPasswordValid = !this.confirmPassword.invalid;
    });
  }

  onSubmit(e: Event){
    // Set defaults
    e.preventDefault();
    this.hasError = false;

    if (this.username.invalid || this.firstName.invalid || 
        this.lastName.invalid || this.age.invalid || 
        this.password.invalid || this.confirmPassword.invalid) {
          this.hasError = true;
          this.errorMessage = 'Please correct the form errors.';
          return;
    }

    // Check fields for values
    if(
      !this.username.value ||
      !this.firstName.value ||
      !this.lastName.value ||
      !this.age.value ||
      !this.password.value ||
      !this.confirmPassword.value
    ){
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    // Check if passwords match
    if(this.password.value !== this.confirmPassword.value){
      this.hasError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Send http request to create user
    this.auth.signUp(
      this.username.value,
      this.firstName.value,
      this.lastName.value,
      this.password.value,
      this.age.value
    ).subscribe({next: (v) => {
      this.router.navigate(['/login']);
    },
    error: (err: any) => {
      this.hasError = true;
      this.errorMessage = 'Error creating account';
      console.log(err);
      if(err.status === 201){
        this.hasError = false;
        this.router.navigate(['/login']);
      }

    },
  });
  }
}
//----------------------------------EndOfFile-----------------------------------//