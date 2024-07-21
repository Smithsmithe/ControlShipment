import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosasignadosComponent } from './pedidosasignados.component';

describe('PedidosasignadosComponent', () => {
  let component: PedidosasignadosComponent;
  let fixture: ComponentFixture<PedidosasignadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosasignadosComponent]
    });
    fixture = TestBed.createComponent(PedidosasignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
