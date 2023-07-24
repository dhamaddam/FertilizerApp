import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanPertumbuhanTanamanPage } from './keragaan-lahan-tanaman-pertumbuhan-tanaman.page';

describe('KeragaanLahanTanamanPertumbuhanTanamanPage', () => {
  let component: KeragaanLahanTanamanPertumbuhanTanamanPage;
  let fixture: ComponentFixture<KeragaanLahanTanamanPertumbuhanTanamanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanLahanTanamanPertumbuhanTanamanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanLahanTanamanPertumbuhanTanamanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
