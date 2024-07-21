import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatdpComponent } from './paginatdp.component';

describe('PaginatdpComponent', () => {
  let component: PaginatdpComponent;
  let fixture: ComponentFixture<PaginatdpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatdpComponent]
    });
    fixture = TestBed.createComponent(PaginatdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
