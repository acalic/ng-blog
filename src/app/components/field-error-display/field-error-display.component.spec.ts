import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorDisplayComponent } from './field-error-display.component';

describe('FieldErrorDisplayComponent', () => {
  let component: FieldErrorDisplayComponent;
  let fixture: ComponentFixture<FieldErrorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldErrorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redner the error', async(() => {
    fixture = TestBed.createComponent(FieldErrorDisplayComponent);
    component = fixture.componentInstance;

    // provide inputs here
    component.errorMsg = 'This field is invalid';
    component.displayError = true;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.text-danger').textContent).toContain('This field is invalid');
 }));
});
