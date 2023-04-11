import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaktorAlamAnomaliPage } from './faktor-alam-anomali.page';

describe('FaktorAlamAnomaliPage', () => {
  let component: FaktorAlamAnomaliPage;
  let fixture: ComponentFixture<FaktorAlamAnomaliPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaktorAlamAnomaliPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaktorAlamAnomaliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
