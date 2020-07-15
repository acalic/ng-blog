import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http.get(this.apiUrl + '/posts');
  }

  getPostById(id: number) {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

  getCommentsByPostId(id: number) {
    return this.http.get(`${this.apiUrl}/posts/${id}/comments`);
  }

  submitComment(id: number, data: object) {
    return this.http.post(`${this.apiUrl}/posts/${id}/comments`, data)
  }

  updateComment(id: number, data: object) {
    return this.http.put(`${this.apiUrl}/comments/${id}`, data)
  }

}