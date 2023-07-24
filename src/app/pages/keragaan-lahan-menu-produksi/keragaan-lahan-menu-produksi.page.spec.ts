import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanLahanMenuProduksiPage } from './keragaan-lahan-menu-produksi.page';

describe('KeragaanLahanMenuProduksiPage', () => {
  let component: KeragaanLahanMenuProduksiPage;
  let fixture: ComponentFixture<KeragaanLahanMenuProduksiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanLahanMenuProduksiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanLahanMenuProduksiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
