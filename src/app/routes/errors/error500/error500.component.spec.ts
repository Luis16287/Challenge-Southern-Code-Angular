import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleService } from 'src/app/shared/components/info-bar/services/page-title.service';
import { Error500Component } from './error500.component';

class PageTitleServiceMock {
  setTitles(str: string): void {

  }
}

describe('Error500Component', () => {
  let component: Error500Component;
  let fixture: ComponentFixture<Error500Component>;


  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ Error500Component ],
      providers: [ { provide: PageTitleService, useClass: PageTitleServiceMock } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
