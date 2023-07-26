import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanIndeksLuasDaunPage } from './keragaan-lahan-tanaman-indeks-luas-daun.page';

describe('KeragaanLahanTanamanIndeksLuasDaunPage', () => {
  let component: KeragaanLahanTanamanIndeksLuasDaunPage;
  let fixture: ComponentFixture<KeragaanLahanTanamanIndeksLuasDaunPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanLahanTanamanIndeksLuasDaunPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanLahanTanamanIndeksLuasDaunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
