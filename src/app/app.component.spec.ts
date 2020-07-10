import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@app/components/header/header.component';
//import { CommentFormComponent } from '@app/components/comment-form/comment-form.component';
//import { FieldErrorDisplayComponent } from '@app/components/field-error-display/field-error-display.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        //CommentFormComponent,
        //FieldErrorDisplayComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /* it(`should have as title 'Blog'`, () => {
      userService = TestBed.get(Title);
      expect(userService.getTitle()).toBe("Blog");
  }); */

});
