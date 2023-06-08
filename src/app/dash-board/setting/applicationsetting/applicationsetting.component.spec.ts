import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsettingComponent } from './applicationsetting.component';

describe('ApplicationsettingComponent', () => {
  let component: ApplicationsettingComponent;
  let fixture: ComponentFixture<ApplicationsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
