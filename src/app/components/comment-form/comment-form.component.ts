import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogService } from '@app/services/blog.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input() postId: number;
  @Input() parentId?: number = null;
  @Input() reply?: boolean;
  @Input() edit?: boolean;
  @Input() editCommentId?: number;

  @Input() commentAuthorVal?: string;
  @Input() commentBodyVal?: string;

  @Output() commentsUpdated: EventEmitter<any> = new EventEmitter();

  commentForm: FormGroup;

  constructor(
    private _blogService: BlogService,
    private _fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.commentForm.get("commentAuthor").setValue(this.commentAuthorVal);
    this.commentForm.get("commentBody").setValue(this.commentBodyVal);
  }

  createForm() {
    this.commentForm = this._fb.group({
      commentAuthor: ['', Validators.required ],
      commentBody: ['', Validators.required]
    });
  }

  isFieldValid(field: string) {
    return !this.commentForm.get(field).valid && this.commentForm.get(field).touched;
  }
  
  displayFieldWarn(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  submitComment(data) {
    let comment = {
      postId: this.postId,
      parent_id: this.parentId,
      user: data.commentAuthor,
      content : data.commentBody,
      date: (new Date()).toISOString().split('T')[0]
    }

    if(this.edit) {
      this._blogService.updateComment(this.editCommentId, comment).toPromise().then(res => {
        this.commentsUpdated.emit(null);
      });
    }else {
      this._blogService.submitComment(this.postId, comment).toPromise().then(res => {
        this.commentsUpdated.emit(null);
      });
    }

    this.commentForm.reset();
  }
}
