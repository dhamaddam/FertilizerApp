import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  stringifiedData: any;  
  parsedJson: any;  

  constructor(
    private route : ActivatedRoute,
    private routerState : Router
  ) { }

  ngOnInit() {

    //Getting string params
    const category = this.route.snapshot.queryParamMap.get('category');
    const filter = this.route.snapshot.queryParamMap.get('filter');

    console.log(`category:${category} - filter: ${filter}`);

    //Getting and parse object param. 

    const queryParams = this.route.snapshot.queryParamMap.get('special') ?? undefined;
    // const value = JSON.parse() ;
    this.stringifiedData = JSON.stringify(this.stringifiedData);
    console.log('stringifiedData', queryParams);

    // Parse from JSON  
    // this.parsedJson = JSON.parse(queryParams);  
    // console.log("With Parsed JSON :" , this.parsedJson);

    const routerState = this.routerState.getCurrentNavigation()?.extras.state ?? undefined;

    const user = routerState ?? undefined;
    // this.parsedJson = JSON.parse(user) ?? undefined;
    console.log('my user :', user);

  }

}
