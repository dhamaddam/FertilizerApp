import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewKeragaanTanamanPage } from './view-keragaan-tanaman.page';

describe('ViewKeragaanTanamanPage', () => {
  let component: ViewKeragaanTanamanPage;
  let fixture: ComponentFixture<ViewKeragaanTanamanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewKeragaanTanamanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewKeragaanTanamanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
