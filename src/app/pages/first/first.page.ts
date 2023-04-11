import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {

  data = null;
  myImage = null;

  constructor(
    private menu: MenuController,
    private DB: DatabaseService
  ) { }


  ngOnInit() {
  }



  downloadFile() {
    // TODO
   }

  openMenu(){
    this.menu.open();
  }

}
