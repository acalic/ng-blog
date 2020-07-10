import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  urlApi = "http://localhost:9001";
  
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get(this.urlApi + '/posts');
  }

  getPostById(id: number) {
    return this.http.get(`${this.urlApi}/posts/${id}`);
  }

  getCommentsByPostId(id: number) {
    return this.http.get(`${this.urlApi}/posts/${id}/comments`);
  }

  submitComment(id: number, data: object) {
    return this.http.post(`${this.urlApi}/posts/${id}/comments`, data)
  }

  updateComment(id: number, data: object) {
    return this.http.put(`${this.urlApi}/comments/${id}`, data)
  }

  /* getPostBySlug(slug: string) {
    return this.http.get(`${this.urlApi}/posts/${slug}`);
  } */

  /* add(data) {
    return this.http.post(this.urlApi, data);
  } */

}