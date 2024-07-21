import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitloadComponent } from './initload.component';

describe('InitloadComponent', () => {
  let component: InitloadComponent;
  let fixture: ComponentFixture<InitloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitloadComponent]
    });
    fixture = TestBed.createComponent(InitloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
