import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public title: Title,
    public meta: Meta
  ) {}

  ngOnInit() {
    this.title.setTitle('Blog');
    this.meta.updateTag({ name: 'description', content: 'This is a simple Angular blog application made by Andrea Calic' });
  }
}



