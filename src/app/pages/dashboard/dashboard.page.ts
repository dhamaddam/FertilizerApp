import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js/auto";
import { Subscription } from "rxjs";
import { DashboardService } from "src/app/services/dashboard/dashboard.service";
import { GlobalService } from "src/app/services/global/global.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit, OnInit{
  @ViewChild("barCanvas") barCanvas: any;
  @ViewChild("doughnutCanvas") doughnutCanvas: any;
  @ViewChild("protasCanvas") protasCanvas: any;
  @ViewChild("radarCanvas") radarCanvas: any;
  @ViewChild("plantProductionCanvas") plantProductionCanvas: any;
  @ViewChild("curahHariHujanCanvas") curahHariHujanCanvas : any;
  
  plantProductionChart: any;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  radarChart : any;
  curahHariHujanChart : any;
  protasChart : any ;
  isLoading: boolean = false;

  
  allProductionYearsSub : Subscription = new Subscription;
  allProductionYears : any[] = []

  allCompositionChartSub : Subscription = new Subscription;
  allCompositionChart : any[] = []

  allProductionChart : any[] = []
  allProductionChartSub : Subscription = new Subscription;

  allCurahHariHujan : any[] = []
  allCurahhariHujanSub : Subscription = new Subscription;

  allProductivityChart : any[] = []
  allProductivityChartSub : Subscription = new Subscription;

  productivityAges : any[] = []

  constructor(
    private global : GlobalService,
    private dashboarServices : DashboardService,
  ) { }

  ngOnInit() {
    
  }
  
  ngAfterViewInit() {

    this.allProductionYearsSub = this.dashboarServices.allProductionYear.subscribe(data => {
      if(data instanceof Array){
        this.allProductionYears = data
      } else {
        this.allProductionYears = this.allProductionYears.concat(data)
      }
    })

    this.allCompositionChartSub = this.dashboarServices.allCompositionChart.subscribe(data => {
      if(data instanceof Array){
        this.allCompositionChart = data 
        this.ComposisiChartMethod();
      } else {
        this.allCompositionChart = this.allCompositionChart.concat(data)
      }
    })

    this.allProductionChartSub = this.dashboarServices.allPlantProduction.subscribe(data => {
      if(data instanceof Object){
        this.allProductionChart = data 
        this.plantProductionChartMethode();
      } else {
        this.allProductionChart = this.allCompositionChart.concat(data)
      }
    })

    this.allCurahhariHujanSub = this.dashboarServices.allCurahhariHujan.subscribe(data => {
      if(data instanceof Object){
        this.allCurahHariHujan = data 
        this.curahHariHujanChartMethode();
      } else {
        this.allCurahHariHujan = this.allCurahHariHujan.concat(data)
      }
    })

    this.allProductivityChartSub = this.dashboarServices.allProtas.subscribe(data => {
      if (data instanceof Object){
        this.allProductivityChart = data.productivities
        this.productivityAges = data.ages
        this.productivityChartMethode()
      } else {
        this.allProductionChart = this.allProductionChart.concat(data)
      }
    })

    this.getAllData()

  }

  async getAllData (){
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.dashboarServices.getProductionYear(79);
      await this.dashboarServices.getCompositionChart(79,2021);
      await this.dashboarServices.getPlantProduction(79,2021);
      await this.dashboarServices.getCurahHariHujan(79,2021)
      await this.dashboarServices.getAllProtas(79,2021)
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

  ComposisiChartMethod() {
    let composition_area : any[] = []
    let composition_label : any[] = []

    this.allCompositionChart.forEach(data => {
      composition_area.push(data.area)
      composition_label.push(data.category)
    })
    if(!this.doughnutChart){
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: composition_label,
          datasets: [{
            label: 'of Area',
            data: composition_area,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            hoverBackgroundColor: [
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384'
            ]
          }]
        }, 
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
        },
      });
    } 
  }

  BarChartMethode(){
    let production_year : any[] = []
    let production_area : any[] = []
    let production_ffb_target : any[] = []
    let production_ffb_realization : any[] = []
    let production_rkap : any[] = []
    let production_real : any[] = []
    let production_percentage : any[] = []

    this.allProductionChart.forEach(result => {
      production_year.push(result.year)
      production_area.push(result.area)
      production_ffb_target.push(result.ffb_target)
      production_ffb_realization.push(result.ffb_realization)
      production_rkap.push(result.rkap)
      production_real.push(result.real)
      production_percentage.push(result.percentage)
    })

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: production_year ,
        datasets: [
          {
            label: "# Produksi",
            data: production_rkap,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
      }
    });
  }
  lineChartMethod() {
    this.lineChart = new Chart(this.protasCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            data: [20, 50, 100, 75, 25, 0],
            label: 'Left dataset',
            yAxisID: 'left-y-axis'
          },
          {
            data: [0.1, 0.5, 1.0, 2.0, 1.5, 0],
            label: 'Right dataset',

            // This binds the dataset to the right y axis
            yAxisID: 'right-y-axis'
          }
        ]
      },
      options: {
        scales: {
          'left-y-axis': {
              type: 'linear',
              position: 'left'
          },
          'right-y-axis': {
              type: 'linear',
              position: 'right'
          }
        }
      },
      

    });
  }

  radarChartMethode(){
    const data = {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }, {
        label: 'My Second Dataset',
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    };
    this.radarChart = new Chart(this.radarCanvas.nativeElement,
      {
        type: 'radar',
        data: data,
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
      });
  }

  productivityChartMethode(){

    let productivity_name : any [] = []
    let productivity_data : any [] = []

    this.allProductivityChart.forEach(result => {
      productivity_name.push(result.name)
      productivity_data.push(result.data) 
    });

    this.protasChart = new Chart(this.protasCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.productivityAges,
        datasets: [
          {
            data: productivity_data,
            label: 'Left dataset',
            yAxisID: 'left-y-axis'
          },
          
        ]
      },
      options: {
        scales: {
          'left-y-axis': {
              type: 'linear',
              position: 'left'
          },
        }
      },
    });

    this.removeData(this.protasChart)
    this.allProductionChart.forEach( result => {
      this.addData(this.protasChart, result.name ,result.data)
    })
  }

  plantProductionChartMethode(){
    let production_year : any[] = []
    let production_area : any[] = []
    let production_ffb_target : any[] = []
    let production_ffb_realization : any[] = []
    let production_rkap : any[] = []
    let production_real : any[] = []
    let production_percentage : any[] = []


    this.allProductionChart.forEach(result => {
      production_year.push(result.year)
      production_area.push(result.area)
      production_ffb_target.push(result.ffb_target)
      production_ffb_realization.push(result.ffb_realization)
      production_rkap.push(result.rkap)
      production_real.push(result.real)
      production_percentage.push(result.percentage)
    })
    if(!this.plantProductionChart){
      this.plantProductionChart = new Chart(this.plantProductionCanvas.nativeElement,
        {
          type: 'scatter',
          data:{
            labels : production_year,
            datasets: [{
              type: 'bar',
              label: 'RKAP',
              data: production_rkap,
              yAxisID: 'left-y-axis',
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }, 
            {
              type: 'bar',
              label: 'Real',
              data : production_real,
              yAxisID: 'left-y-axis',
              borderColor: 'rgb(185, 99, 132)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)'
            },
            {
              type: 'line',
              label: 'RKAP vs Real',
              data: production_percentage,
              yAxisID: 'right-y-axis',
              fill: true,
              borderColor: 'rgb(54, 162, 235)'
            }]
          }, 
          options: {
            scales: {
              'left-y-axis': {
                  type: 'linear',
                  position: 'left'
              },
              'right-y-axis': {
                  type: 'linear',
                  position: 'right'
              }
            }
          }
        }); 
    }
   
  }

  curahHariHujanChartMethode(){
    let rainfall_month : any[] = []
    let rainfall_rainfall : any[] = []
    let rainfall_rainy_day : any[] = []
   
    this.allCurahHariHujan.forEach(result => {
      rainfall_month.push(result.month)
      rainfall_rainfall.push(result.rainfall)
      rainfall_rainy_day.push(result.rainy_day)
    })
    
    if(!this.curahHariHujanChart){
      this.curahHariHujanChart = new Chart(this.curahHariHujanCanvas.nativeElement,
        {
          type: 'scatter',
          data:{
            labels : rainfall_month,
            datasets: [{
              type: 'bar',
              label: 'Curah Hujan',
              data: rainfall_rainfall,
              yAxisID: 'left-y-axis',
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }, 
            {
              type: 'line',
              label: 'Hari Hujan',
              data: rainfall_rainy_day,
              yAxisID: 'right-y-axis',
              fill: true,
              borderColor: 'rgb(54, 162, 235)'
            }]
          }, 
          options: {
            scales: {
              'left-y-axis': {
                  type: 'linear',
                  position: 'left'
              },
              'right-y-axis': {
                  type: 'linear',
                  position: 'right'
              }
            }
          }
        }); 
    }
  }

  addData(chart: any, label : any, data : any) {

    console.log("data add Data",data)
    chart.data.labels.push(label);
    console.log("data add Data",data)
    chart.data.datasets.forEach((dataset : any) => {
        dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart : any) {
      // chart.data.labels.pop();
      
      chart.data.datasets.forEach((dataset : any) => {
          console.log("i am in foreach",dataset)
          dataset.data.pop();
      });
      chart.update();
  }
}
