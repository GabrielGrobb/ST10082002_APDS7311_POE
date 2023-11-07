import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';
import { PostServiceService } from 'src/app/services/post.service';

//----------------------------------------------------------------------------//

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//----------------------------------------------------------------------------//

export class HomeComponent implements OnInit {
  posts: any[] = [];
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

    this.postsService.getPosts().subscribe({
      next: (v) => (this.posts = v as any),
      error: (err) => console.log(err),
    });
  }

 //----------------------------------------------------------------------------//

  deletePost(id: string) {
    // Display a confirmation dialog
    const confirmDelete = window.confirm('Confirm deletion request. Are you sure you want to delete this post?');
  
    if (confirmDelete) {
      // If the user clicks "OK" (yes), proceed with deletion
      this.postsService.delete(id).subscribe({
        next: (v) => {
          console.log('Post deleted successfully:', v);
          
          // Filter out the deleted post from the list
          this.posts = this.posts.filter((post) => post._id !== id);
  
          // Reload the page to refresh the view (you can also use Angular's routing)
          //location.reload(); // Note: This causes a full page reload
        },
        error: (e) => console.log('Error deleting post:', e)
      });
    }
  }
  
  //----------------------------------------------------------------------------//
}
//----------------------------------EndOfFile-----------------------------------//