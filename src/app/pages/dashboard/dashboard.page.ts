import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js/auto";
import { Subscription } from "rxjs";
import { DashboardService } from "src/app/services/dashboard/dashboard.service";
import { GlobalService } from "src/app/services/global/global.service";
import colorLib from '@kurkle/color';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit, OnInit{
  @ViewChild("barCanvas") barCanvas: any;
  @ViewChild("doughnutCanvas") doughnutCanvas: any;
  @ViewChild("TotalBunchDataCanvas") TotalBunchDataCanvas: any;
  @ViewChild("AWBCanvas") AWBCanvas: any;
  @ViewChild("radarCanvas") radarCanvas: any;
  @ViewChild("protasCanvas") protasCanvas : any;
  @ViewChild("plantProductionCanvas") plantProductionCanvas: any;
  @ViewChild("curahHariHujanCanvas") curahHariHujanCanvas : any;
  
  plantProductionChart: any;
  awbChart : any;
  TotalBunchChart : any;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  radarChart : any;
  curahHariHujanChart : any;
  protasChart : any ;
  TotalBunchDataChart : any;
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

  allTotalBunchDataChart : any[] = []
  allTotalBunchDataSub : Subscription = new Subscription;

  allAWBSub : Subscription = new Subscription;
  allAWBData : any[] = []
  

  productivityAges : any[] = []
  allAWBAges : any[] = []
  allTotalBunchAges : any[] = []
  totalBunchAges : any[] = []

   CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };
  
   NAMED_COLORS = [
    this.CHART_COLORS.red,
    this.CHART_COLORS.orange,
    this.CHART_COLORS.yellow,
    this.CHART_COLORS.green,
    this.CHART_COLORS.blue,
    this.CHART_COLORS.purple,
    this.CHART_COLORS.grey,
  ];

  

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

    this.allTotalBunchDataSub = this.dashboarServices.allTotalBunch.subscribe(data => {
      if (data instanceof Object){
        this.allTotalBunchDataChart = data.total_bunch_per_trees
        this.allTotalBunchAges = data.ages
        this.jumlahTandanPohonPerTahunChartMethode()
      } else {
        this.allTotalBunchDataChart = this.allTotalBunchDataChart.concat(data)
      }
    })

    this.allAWBSub = this.dashboarServices.allABW.subscribe(data => {
      if (data instanceof Object){
        this.allAWBData = data.awb
        this.allAWBAges = data.ages
        this.AWBChart()
      } else {
        this.allAWBData = this.allAWBData.concat(data)
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
      await this.dashboarServices.getCurahHariHujan(79,2021);
      await this.dashboarServices.getAllProtas(79,2021);
      await this.dashboarServices.getAllTotalBunch(79,2021);
      await this.dashboarServices.getAllABW(79,2021);
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
  transparentize(value : any, opacity : any) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
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
    if(!this.TotalBunchChart){   
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
    
  }

  productivityChartMethode(){

    let productivity_name : any [] = []
    let productivity_data : any [] = []

    this.allProductivityChart.forEach(result => {
      productivity_name.push(result.name)
      productivity_data.push(result.data) 
    });

    if(!this.protasChart){
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
    }
    

    var i : number = 0;
    for(i = 0; i < this.protasChart.data.datasets.length; i++){
      this.protasChart.data.datasets.pop();
    }

    this.allProductivityChart.forEach( result => {
      const dsColor = this.namedColor(this.protasChart.data.datasets.length);
      const newDataset = {
        label: result.name,
        backgroundColor: this.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        data: result.data,
        yAxisID: 'left-y-axis'
      };
      this.protasChart.data.datasets.push(newDataset);
    })
  }

  jumlahTandanPohonPerTahunChartMethode(){

    let total_bunch_name : any [] = []
    let total_bunch_data : any [] = []
    this.allTotalBunchDataChart.forEach(result => {
      total_bunch_name.push(result.name)
      total_bunch_data.push(result.data) 
    });

    if(!this.TotalBunchChart){  
      this.TotalBunchChart = new Chart(this.TotalBunchDataCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.allTotalBunchAges,
          datasets: [
            {
              data: total_bunch_data,
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
    }
    

    var i : number = 0;
    for(i = 0; i < this.TotalBunchChart.data.datasets.length; i++){
      this.TotalBunchChart.data.datasets.pop();
    }

    this.allTotalBunchDataChart.forEach( result => {
      const dsColor = this.namedColor(this.TotalBunchChart.data.datasets.length);
      const newDataset = {
        label: result.name,
        backgroundColor: this.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        data: result.data,
        yAxisID: 'left-y-axis'
      };
      this.TotalBunchChart.data.datasets.push(newDataset);
    })
  }

  AWBChart(){

    let awb_name : any [] = []
    let awb_bunch_data : any [] = []

    this.allAWBData.forEach(result => {
      awb_name.push(result.name)
      awb_bunch_data.push(result.data) 
    });

    if(!this.awbChart){ 
      this.awbChart = new Chart(this.AWBCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.allAWBAges,
          datasets: [
            {
              data: awb_bunch_data,
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
    }
    

    var i : number = 0;
    for(i = 0; i < this.awbChart.data.datasets.length; i++){
      this.awbChart.data.datasets.pop();
    }

    this.allAWBData.forEach( result => {
      const dsColor = this.namedColor(this.awbChart.data.datasets.length);
      const newDataset = {
        label: result.name,
        backgroundColor: this.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        data: result.data,
        yAxisID: 'left-y-axis'
      };
      this.awbChart.data.datasets.push(newDataset);
    })
  }

  namedColor(index : any) {
    return this.NAMED_COLORS[index % this.NAMED_COLORS.length];
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


  removeData(chart : any) {
    chart.data.labels.splice(-1, 1); // remove the label first
      chart.data.datasets.forEach((dataset : any) => {
          dataset.data.pop();
      });
      chart.update();
  }
}
