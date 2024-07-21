import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AusuariosComponent } from './ausuarios.component';

describe('AusuariosComponent', () => {
  let component: AusuariosComponent;
  let fixture: ComponentFixture<AusuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AusuariosComponent]
    });
    fixture = TestBed.createComponent(AusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
