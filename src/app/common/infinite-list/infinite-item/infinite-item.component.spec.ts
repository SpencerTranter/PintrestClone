import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteItemComponent } from './infinite-item.component';

describe('InfiniteItemComponent', () => {
  let component: InfiniteItemComponent;
  let fixture: ComponentFixture<InfiniteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
