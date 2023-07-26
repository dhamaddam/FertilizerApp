import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanDefisiensiHaraTanamanPage } from './keragaan-lahan-tanaman-defisiensi-hara-tanaman.page';

describe('KeragaanLahanTanamanDefisiensiHaraTanamanPage', () => {
  let component: KeragaanLahanTanamanDefisiensiHaraTanamanPage;
  let fixture: ComponentFixture<KeragaanLahanTanamanDefisiensiHaraTanamanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanLahanTanamanDefisiensiHaraTanamanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanLahanTanamanDefisiensiHaraTanamanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
