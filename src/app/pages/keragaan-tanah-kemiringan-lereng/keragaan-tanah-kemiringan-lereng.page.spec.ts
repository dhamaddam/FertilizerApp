import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanTanahKemiringanLerengPage } from './keragaan-tanah-kemiringan-lereng.page';

describe('KeragaanTanahKemiringanLerengPage', () => {
  let component: KeragaanTanahKemiringanLerengPage;
  let fixture: ComponentFixture<KeragaanTanahKemiringanLerengPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanTanahKemiringanLerengPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanTanahKemiringanLerengPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
