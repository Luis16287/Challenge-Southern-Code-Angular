import { Error401Component } from './error401.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleService } from '../../../shared/components/info-bar/services/page-title.service';


class PageTitleServiceMock {
  setTitles(str: string): void {

  }
}

describe('Error404Component', () => {
  let component: Error401Component;
  let fixture: ComponentFixture<Error401Component>;


  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ Error401Component ],
      providers: [ { provide: PageTitleService, useClass: PageTitleServiceMock } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
