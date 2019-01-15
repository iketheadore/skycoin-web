import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { MockLanguageService, MockTranslatePipe, MockTranslateService } from './utils/test-mocks';
import { LanguageService } from './services/language.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, MockTranslatePipe ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: Router, useValue: { events: Observable.of({}) } },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
