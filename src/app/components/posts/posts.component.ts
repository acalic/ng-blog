import { BlogService } from '@app/services/blog.service';
import { Post } from '@app/models/post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})

export class PostsComponent implements OnInit {
  posts$: Post[] = [];

  constructor(private _blogService: BlogService) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this._blogService.getAllPosts().subscribe((res: []) => {
      this.posts$ = this.sortByPublishDate(res);
    });
  }

  sortByPublishDate(arr: []): [] {
    return arr.sort((a: Post, b: Post) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
  }
}
