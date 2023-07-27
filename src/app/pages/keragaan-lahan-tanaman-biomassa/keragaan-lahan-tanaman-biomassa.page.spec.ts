import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanBiomassaPage } from './keragaan-lahan-tanaman-biomassa.page';

describe('KeragaanLahanTanamanBiomassaPage', () => {
  let component: KeragaanLahanTanamanBiomassaPage;
  let fixture: ComponentFixture<KeragaanLahanTanamanBiomassaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanLahanTanamanBiomassaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanLahanTanamanBiomassaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
