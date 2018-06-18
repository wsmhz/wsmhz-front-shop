import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCenterComponent } from './order-center.component';

describe('OrderCenterComponent', () => {
  let component: OrderCenterComponent;
  let fixture: ComponentFixture<OrderCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
