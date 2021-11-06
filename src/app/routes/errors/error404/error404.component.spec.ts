import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleService } from 'src/app/shared/components/info-bar/services/page-title.service';
import { Error404Component } from './error404.component';

class PageTitleServiceMock {
  setTitles(str: string): void {

  }
}

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;


  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ Error404Component ],
      providers: [ { provide: PageTitleService, useClass: PageTitleServiceMock } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
