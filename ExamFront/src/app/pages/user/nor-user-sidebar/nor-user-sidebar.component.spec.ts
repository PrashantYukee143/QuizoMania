import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorUserSidebarComponent } from './nor-user-sidebar.component';

describe('NorUserSidebarComponent', () => {
  let component: NorUserSidebarComponent;
  let fixture: ComponentFixture<NorUserSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NorUserSidebarComponent]
    });
    fixture = TestBed.createComponent(NorUserSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
