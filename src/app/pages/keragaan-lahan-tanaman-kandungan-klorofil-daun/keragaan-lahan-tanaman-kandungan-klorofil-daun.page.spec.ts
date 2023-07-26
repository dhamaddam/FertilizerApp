import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanKandunganKlorofilDaunPage } from './keragaan-lahan-tanaman-kandungan-klorofil-daun.page';

describe('KeragaanLahanTanamanKandunganKlorofilDaunPage', () => {
  let component: KeragaanLahanTanamanKandunganKlorofilDaunPage;
  let fixture: ComponentFixture<KeragaanLahanTanamanKandunganKlorofilDaunPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanLahanTanamanKandunganKlorofilDaunPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanLahanTanamanKandunganKlorofilDaunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
