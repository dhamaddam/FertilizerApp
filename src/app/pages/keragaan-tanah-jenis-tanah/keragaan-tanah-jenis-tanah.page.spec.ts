import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KeragaanTanahJenisTanahPage } from './keragaan-tanah-jenis-tanah.page';

describe('KeragaanTanahJenisTanahPage', () => {
  let component: KeragaanTanahJenisTanahPage;
  let fixture: ComponentFixture<KeragaanTanahJenisTanahPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeragaanTanahJenisTanahPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeragaanTanahJenisTanahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
