import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewFaktorAlamAnomaliPage } from './view-faktor-alam-anomali.page';

describe('ViewFaktorAlamAnomaliPage', () => {
  let component: ViewFaktorAlamAnomaliPage;
  let fixture: ComponentFixture<ViewFaktorAlamAnomaliPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFaktorAlamAnomaliPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFaktorAlamAnomaliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
