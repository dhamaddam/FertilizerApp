import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewKeragaanTanahPage } from './view-keragaan-tanah.page';

describe('ViewKeragaanTanahPage', () => {
  let component: ViewKeragaanTanahPage;
  let fixture: ComponentFixture<ViewKeragaanTanahPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewKeragaanTanahPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewKeragaanTanahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
