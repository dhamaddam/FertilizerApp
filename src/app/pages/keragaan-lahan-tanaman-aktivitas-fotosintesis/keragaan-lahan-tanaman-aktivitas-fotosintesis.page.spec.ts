import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanAktivitasFotosintesisPage } from './keragaan-lahan-tanaman-aktivitas-fotosintesis.page';

describe('KeragaanLahanTanamanAktivitasFotosintesisPage', () => {
  let component: KeragaanLahanTanamanAktivitasFotosintesisPage;
  let fixture: ComponentFixture<KeragaanLahanTanamanAktivitasFotosintesisPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanLahanTanamanAktivitasFotosintesisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanLahanTanamanAktivitasFotosintesisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
