import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string = null;
  errorSubscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.loadPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.loadPosts();
  }

  private loadPosts() {
    this.errorSubscription = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts: Post[]) => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, error => {
      console.log(error);
      this.error = error.message;
    });
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(postData => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.isFetching = false;
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
