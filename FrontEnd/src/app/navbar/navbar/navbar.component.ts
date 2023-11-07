import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = true;
  
  constructor(private router: Router, private auth: AuthServiceService){}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event.constructor.name === 'NavigationEnd') {
        this.isLoggedIn = this.auth.isLoggedIn;
      }
    });
  }

  homePage(){
    this.router.navigate(['/home'])
  }

  addPost(){
    this.router.navigate(['/create-post'])
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
