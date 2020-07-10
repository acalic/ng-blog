import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '@app/services/blog.service';

import { Post } from '@app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Post = null;
  postId$: number;

  comments$: Comment[] = []
  commentsTree: {} = {};
  commentsTotalNum: number;

  commentsCollapsedIds: number[] = [];
  commentReplyBoxActiveId: number;
  commentEditBoxActiveId: number;

  constructor(
    public blogService: BlogService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.postId$ = params.id;
      this.blogService.getPostById(params.id).subscribe((res: Post) => {
        this.post$ = res;
      })
      this.getComments();
    })
  }

  getComments() {
    this.blogService.getCommentsByPostId(this.postId$).subscribe((res: Comment[]) => {
      this.comments$ = this.listToTree(res);
      this.commentsTotalNum = res.length
    })
  }

  toggleShowReplies(id: number) {
    if(this.commentsCollapsedIds.indexOf(id) > -1) {
      const index = this.commentsCollapsedIds.indexOf(id, 0);
      if (index > -1) {
        this.commentsCollapsedIds.splice(index, 1);
      }
    } else {
      this.commentsCollapsedIds.push(id)
    }

    //this.commentsTree[this.commentReplyBoxActiveId]['replyBoxCollapsed'] = true; // close reply box
    //this.commentsTree[this.commentEditBoxActiveId]['editBoxCollapsed'] = true; // close edit box

    this.commentsTree[id]['childrenCollapsed'] = !this.commentsTree[id]['childrenCollapsed'];
  }

  toggleShowReplyBox(id: number) {
    this.commentReplyBoxActiveId = id;
    if (this.commentEditBoxActiveId) this.commentsTree[this.commentEditBoxActiveId]['editBoxCollapsed'] = true; // close edit box
    this.commentsTree[id]['replyBoxCollapsed'] = !this.commentsTree[id]['replyBoxCollapsed'];
  }

  toggleShowEditComBox(id: number) {
    this.commentEditBoxActiveId = id;
    if (this.commentReplyBoxActiveId) this.commentsTree[this.commentReplyBoxActiveId]['replyBoxCollapsed'] = true; // close reply box
    this.commentsTree[id]['editBoxCollapsed'] = !this.commentsTree[id]['editBoxCollapsed'];
  }

  listToTree(arr: Comment[]) {
    let tree = [],
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      this.commentsTree[arrElem.id] = arrElem;
      this.commentsTree[arrElem.id]['children'] = [];
      this.commentsTree[arrElem.id]['childrenCollapsed'] = this.commentsCollapsedIds.indexOf(arrElem.id) > -1 ? false : true;
      this.commentsTree[arrElem.id]['replyBoxCollapsed'] = true;
      this.commentsTree[arrElem.id]['editBoxCollapsed'] = true;
    }

    for (var id in this.commentsTree) {
      if (this.commentsTree.hasOwnProperty(id)) {
        mappedElem = this.commentsTree[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parent_id) {
          this.commentsTree[mappedElem['parent_id']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

}