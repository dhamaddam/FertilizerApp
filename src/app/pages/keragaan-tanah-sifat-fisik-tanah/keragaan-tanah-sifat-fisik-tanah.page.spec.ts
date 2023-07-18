import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanTanahSifatFisikTanahPage } from './keragaan-tanah-sifat-fisik-tanah.page';

describe('KeragaanTanahSifatFisikTanahPage', () => {
  let component: KeragaanTanahSifatFisikTanahPage;
  let fixture: ComponentFixture<KeragaanTanahSifatFisikTanahPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanTanahSifatFisikTanahPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanTanahSifatFisikTanahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
