import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotourlComponent } from './gotourl.component';

describe('GotourlComponent', () => {
  let component: GotourlComponent;
  let fixture: ComponentFixture<GotourlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GotourlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GotourlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
