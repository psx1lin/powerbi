import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetusergroupComponent } from './setusergroup.component';

describe('SetusergroupComponent', () => {
  let component: SetusergroupComponent;
  let fixture: ComponentFixture<SetusergroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetusergroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetusergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
