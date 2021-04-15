import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpiuploadComponent } from './bpiupload.component';

describe('BpiuploadComponent', () => {
  let component: BpiuploadComponent;
  let fixture: ComponentFixture<BpiuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpiuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BpiuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
