import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';
import { PostServiceService } from 'src/app/services/post.service';

//----------------------------------------------------------------------------//
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

//----------------------------------------------------------------------------//

export class CreatePostComponent implements OnInit{
  posts: any[] = [];
  title = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30),
    Validators.pattern('^[a-zA-Z ]*$')
  ]);
  description = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(150),
    Validators.pattern('^[a-zA-Z ]*$')
  ]);
  department = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),
    Validators.pattern('^[a-zA-Z ]*$')
  ]);

  isTitleValid = false;
  isDepartmentValid = false;
  isDescriptionValid = false;
  hasError = false;
  errorMessage = '';

  //----------------------------------------------------------------------------//

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private postsService: PostServiceService
  ) {}

  //----------------------------------------------------------------------------//

  ngOnInit(): void {
    if (!this.auth.isLoggedIn){
      this.router.navigate(['/login']);
      return;
    }

    // Subscribe to the valueChanges event of the title control
    this.title.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isTitleValid = !this.title.invalid;
    });

    this.description.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isDescriptionValid = !this.description.invalid;
    });

    this.department.valueChanges.subscribe((newValue) => {
      // Check if the title is valid
      this.isDepartmentValid = !this.department.invalid;
    });
  }

 //----------------------------------------------------------------------------//
 
 addNewPost(e: Event) {
    e.preventDefault();
    this.hasError = false;

    if(
      !this.title.value ||
      !this.description.value ||
      !this.department.value
    ) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    this.postsService
    .add(this.title.value, this.description.value,this.department.value)
    .subscribe({
      next: (v) => {
        this.posts.push(v);
        this.title.setValue('');
        this.description.setValue('');
        this.department.setValue('');
      },
      error: (e) => {
        this.hasError = true;
        this.errorMessage = e.error;
        console.log(e);
      },
    });

    // Display a confirmation dialog
    const confirmAdd = window.confirm('Post Successfully added!!');

    if (confirmAdd) {
      this.router.navigate(['/home']);
    }
  }

//----------------------------------------------------------------------------//

}
//----------------------------------EndOfFile-----------------------------------//