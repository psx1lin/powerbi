import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddgroupComponent } from './user-addgroup.component';

describe('UserAddgroupComponent', () => {
  let component: UserAddgroupComponent;
  let fixture: ComponentFixture<UserAddgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
