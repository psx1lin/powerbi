import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergroupAddComponent } from './usergroup-add.component';

describe('UsergroupAddComponent', () => {
  let component: UsergroupAddComponent;
  let fixture: ComponentFixture<UsergroupAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergroupAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
