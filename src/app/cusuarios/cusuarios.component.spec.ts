import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusuariosComponent } from './cusuarios.component';

describe('CusuariosComponent', () => {
  let component: CusuariosComponent;
  let fixture: ComponentFixture<CusuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CusuariosComponent]
    });
    fixture = TestBed.createComponent(CusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
