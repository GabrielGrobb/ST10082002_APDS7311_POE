import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');
  hasError = false;
  errorMessage = '';

  constructor(public router: Router, public auth: AuthServiceService){}

  ngOnInit(): void{
  }

  onSubmit(e: Event){
    e.preventDefault();
    this.hasError = false;

    if(!this.username.value || !this.password.value) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    this.auth.login(this.username.value, this.password.value).subscribe({
      next: (v) => {
        const { token } = v as any;
        localStorage.setItem('x-auth-token', token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.hasError = true;
        this.errorMessage = 'Error logging in, check username or password';
      },
    });
  }
}
//----------------------------------EndOfFile-----------------------------------//