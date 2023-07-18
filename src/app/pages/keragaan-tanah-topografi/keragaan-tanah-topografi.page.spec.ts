import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanTanahTopografiPage } from './keragaan-tanah-topografi.page';

describe('KeragaanTanahTopografiPage', () => {
  let component: KeragaanTanahTopografiPage;
  let fixture: ComponentFixture<KeragaanTanahTopografiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanTanahTopografiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanTanahTopografiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
