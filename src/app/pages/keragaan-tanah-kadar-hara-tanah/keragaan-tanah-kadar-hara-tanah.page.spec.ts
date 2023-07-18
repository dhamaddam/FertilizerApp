import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanTanahKadarHaraTanahPage } from './keragaan-tanah-kadar-hara-tanah.page';

describe('KeragaanTanahKadarHaraTanahPage', () => {
  let component: KeragaanTanahKadarHaraTanahPage;
  let fixture: ComponentFixture<KeragaanTanahKadarHaraTanahPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanTanahKadarHaraTanahPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanTanahKadarHaraTanahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
