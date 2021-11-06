import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppAccordionComponent } from './app-accordion.component';

describe('AppAccordionComponent', () => {
  let component: AppAccordionComponent;
  let fixture: ComponentFixture<AppAccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
