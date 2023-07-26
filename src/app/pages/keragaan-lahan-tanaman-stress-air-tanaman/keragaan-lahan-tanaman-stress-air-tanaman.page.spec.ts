import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanStressAirTanamanPage } from './keragaan-lahan-tanaman-stress-air-tanaman.page';

describe('KeragaanLahanTanamanStressAirTanamanPage', () => {
  let component: KeragaanLahanTanamanStressAirTanamanPage;
  let fixture: ComponentFixture<KeragaanLahanTanamanStressAirTanamanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanLahanTanamanStressAirTanamanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanLahanTanamanStressAirTanamanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
