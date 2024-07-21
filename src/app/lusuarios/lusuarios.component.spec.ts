import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LusuariosComponent } from './lusuarios.component';

describe('LusuariosComponent', () => {
  let component: LusuariosComponent;
  let fixture: ComponentFixture<LusuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LusuariosComponent]
    });
    fixture = TestBed.createComponent(LusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
