import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuizzesComponent } from './show-quizzes.component';

describe('ShowQuizzesComponent', () => {
  let component: ShowQuizzesComponent;
  let fixture: ComponentFixture<ShowQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowQuizzesComponent]
    });
    fixture = TestBed.createComponent(ShowQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
