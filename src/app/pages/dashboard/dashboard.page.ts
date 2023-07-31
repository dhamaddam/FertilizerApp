import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js/auto";
import { Subscription } from "rxjs";
import { DashboardService } from "src/app/services/dashboard/dashboard.service";
import { GlobalService } from "src/app/services/global/global.service";
import colorLib from '@kurkle/color';
import { AuthService } from "src/app/services/auth/auth.service";
import { PerusahaanService } from "src/app/services/perusahaan/perusahaan.service";
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
  plantation_id : number = 0 ;
  
  // companyProfile 
  _allAfdelling : any[] = [];
  _allKebun : any[] = [];
  allCompany : any[] = [];
  allCompanySubs: Subscription = new Subscription;
  allKebun : any[] = [];
  allKebunSubs: Subscription = new Subscription;
  allAfdelling : any[] = [];
  allAfdellingSubs: Subscription = new Subscription;


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
  year_production : number = 0
  temp : any;

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
    private authServices : AuthService,
    private companyServices: PerusahaanService,
  ) { }

  ngOnInit() {
    this.getAuth()
    this.allCompanySubs = this.companyServices.allCompany.subscribe(company =>
      {
        if (company instanceof Array){
          this.allCompany = company;
        } else {
          // if(company?.delete){
          //   this.allCompany= this.allCompany.filter(x => x.id != company.id);
          // }
          // else if (company?.update){
          //   const index = this.allCompany.findIndex(x => x.id == company.id);
          //   this.allCompany[index] = company;
          // } else {
          //   this.allCompany = this.allCompany.concat(company);
          // }
          this.allCompany = this.allCompany.concat(company);
        }
      });

      this.allKebunSubs = this.companyServices.allKebun.subscribe(kebun => {
        if (kebun instanceof Array){
          this.allKebun = kebun;
          this._allKebun = kebun
        } else {
          this.allKebun = this.allKebun.concat(kebun);
          this._allKebun = this._allKebun.concat(kebun);
         }
      });

      this.allAfdellingSubs = this.companyServices.allAfdelling.subscribe(afdelling => {
        if (afdelling instanceof Array){
          this.allAfdelling = afdelling;
          this._allAfdelling = afdelling;
        } else {
          this.allAfdelling = this.allAfdelling.concat(afdelling);
        }
      });
      
      this.allProductionYearsSub = this.dashboarServices.allProductionYear.subscribe(data => {
        if(data instanceof Array){
          this.allProductionYears = data
        } else {
          this.allProductionYears = this.allProductionYears.concat(data)
        }
      })
      this.getAllDataCompany();
      this.getAllData();
  }
  
  async getAllDataCompany(){
    // this.isLoading = true;
    // this.global.showLoader();

      setTimeout(async() => {
        await this.companyServices.getAfdelling();
        await this.companyServices.getKebun();
        await this.companyServices.getPerusahaan();
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }
  
  handleTahun ( event : any){
    this.year_production = event.detail.value
    console.log("year_production",this.year_production)
    this.getAllData()
  }
  async getAuth(){
    const val = await this.authServices.getId();
    if(val){
      let data = JSON.parse(val)
      this.plantation_id = data.plantation_id
    }
    
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
        this.allProductionChart = this.allProductionChart.concat(data)
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

  async getAllData(){
    // this.isLoading = true;
    // this.global.showLoader();
    setTimeout(async() => {
      this.plantation_id = 79
      await this.dashboarServices.getProductionYear(this.plantation_id);
      await this.dashboarServices.getCompositionChart(this.plantation_id,this.year_production);
      await this.dashboarServices.getPlantProduction(this.plantation_id,this.year_production);
      await this.dashboarServices.getCurahHariHujan(this.plantation_id,this.year_production);
      await this.dashboarServices.getAllProtas(this.plantation_id,this.year_production);
      await this.dashboarServices.getAllTotalBunch(this.plantation_id,this.year_production);
      await this.dashboarServices.getAllABW(this.plantation_id,this.year_production);
      this.isLoading = false;
      this.global.hideLoader();
    }, 1000);
  }

  async getYearData(){
    this.isLoading = true;
    this.global.showLoader();
    setTimeout(async() => {
      await this.dashboarServices.getProductionYear(this.plantation_id);
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
          plugins : {
            legend : {
              labels : {
                boxWidth : 10,
                font: {
                  size: 10
                },
              },
              display : true,
            }
          },
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
    else {
      var i : number = 0;
      //remove datasets
     for(i = 0; i < this.doughnutChart.data.labels.length; i++){
        //remove data labels
       this.doughnutChart.data.labels.pop()
       this.doughnutChart.data.datasets.pop();
     }
     this.doughnutChart.data.labels.pop()
     this.doughnutChart.data.labels.pop()
     this.doughnutChart.data.labels.pop()
     this.doughnutChart.data.labels.pop()
     this.doughnutChart.data.labels.pop()
     this.doughnutChart.data.labels.pop()
     this.doughnutChart.data.labels.pop()
     this.doughnutChart.data.labels.pop()
     this.doughnutChart.data.labels.pop()
     
     for(i = 0; i < composition_label.length; i++){
        //add the new one 
        this.doughnutChart.data.labels.push(composition_label[i])
     }

     const newDataset = {
       label: "of Area",
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
       ],
       data: composition_area,
       yAxisID: 'left-y-axis'
     };
     this.doughnutChart.data.datasets.push(newDataset);
     this.doughnutChart.update()
   }
  }
  transparentize(value : any, opacity : any) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
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
          plugins : {
            legend : {
              labels : {
                boxWidth : 10,
              },
              display : true,
            }
          },
          scales: {
            x: {
              title: {
                color: this.NAMED_COLORS[1],
                display: true,
                text: 'Umur (tahun)'
              }
            },
            'left-y-axis': {
                type: 'linear',
                position: 'left',
                title : {
                  text : 'ton TBS / ha',
                  display: true,
                  color : this.NAMED_COLORS[2]
                }
            },
          },
        },
      });
    }
    var i : number = 0;
    for(i = 0; i < this.protasChart.data.labels.length; i++){
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
    this.protasChart.update();
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
          plugins : {
            legend : {
              labels : {
                boxWidth : 10,
                font : {
                  size : 10,
                },
              },
              display : true,
            }
          },
          scales: {
            x: {
              title: {
                color: this.NAMED_COLORS[1],
                display: true,
                text: 'Umur (tahun)'
              }
            },
            'left-y-axis': {
                type: 'linear',
                position: 'left',
                title : {
                  text : 'tandan / pohon',
                  display: true,
                  color : this.NAMED_COLORS[2]
                }
            },
          },
        },
      });
    }
    

    var i : number = 0;
    for(i = 0; i < this.TotalBunchChart.data.labels.length; i++){
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
    this.TotalBunchChart.update()
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
              label: 'AWB Default',
              yAxisID: 'left-y-axis'
            },
            
          ]
        },
        options: {
          plugins : {
            legend : {
              labels : {
                boxWidth : 10,
                font : {
                  size : 10,
                },
              },
              display : true,
            }
          },
          scales: {
            x: {
              title: {
                color: this.NAMED_COLORS[1],
                display: true,
                text: 'Umur (tahun)'
              }
            },
            'left-y-axis': {
                type: 'linear',
                position: 'left',
                title : {
                  text : 'kg / tandan',
                  display: true,
                  color : this.NAMED_COLORS[2]
                }
            },
          },
        },
      });
    }
    

    var i : number = 0;
    for(i = 0; i < this.awbChart.data.labels.length; i++){
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
    this.awbChart.update()
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
            datasets: []
          }, 
          options: {
            plugins : {
              legend : {
                labels : {
                  boxWidth : 10,
                  font : {
                    size : 10,
                  },
                },
                display : true,
              }
            },
            scales: {
              x: {
                title: {
                  color: this.NAMED_COLORS[1],
                  display: true,
                  text: 'Tahun'
                },
              },
              'left-y-axis': {
                  type: 'linear',
                  position: 'left',
                  title : {
                    text : 'ton TBS / ha',
                    display: true,
                    color : this.NAMED_COLORS[2]
                  }
              },
              'right-y-axis': {
                  type: 'linear',
                  position: 'right',
                  title : {
                    text : 'Persentase (%)',
                    display: true,
                    color : this.NAMED_COLORS[2]
                  }
              }
            },
          }
        }); 
    }

    var i : number = 0;
    for(i = 0; i < this.plantProductionChart.data.labels.length; i++){
      this.plantProductionChart.data.datasets.pop();
    }
    this.plantProductionChart.update()
      
      const newDataset = {
          type: 'bar',
          label: 'RKAP',
          data: production_rkap,
          yAxisID: 'left-y-axis',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)'
      };
      this.plantProductionChart.data.datasets.push(newDataset);

      const newDataset1 = {
        type: 'bar',
        label: 'Real',
        data : production_real,
        yAxisID: 'left-y-axis',
        borderColor: 'rgb(185, 99, 132)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)'
      };
      this.plantProductionChart.data.datasets.push(newDataset1);
      
      const newDataset2 = {
        type: 'line',
        label: 'RKAP vs Real',
        data: production_percentage,
        yAxisID: 'right-y-axis',
        fill: true,
        borderColor: 'rgb(54, 162, 235)'
      };
      this.plantProductionChart.data.datasets.push(newDataset2);
      this.plantProductionChart.update();
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
            plugins : {
              legend : {
                labels : {
                  boxWidth : 10,
                  font : {
                    size : 10,
                  },
                },
                display : true,
              }
            },
            scales: {
              x: {
                title: {
                  color: this.NAMED_COLORS[1],
                  display: true,
                  text: 'Month'
                }
              },
              'left-y-axis': {
                  type: 'linear',
                  position: 'left',
                  title : {
                    text : 'Curah Hujan (mm)',
                    display: true,
                    color : this.NAMED_COLORS[2]
                  }
              },
              'right-y-axis': {
                  type: 'linear',
                  position: 'right',
                  title : {
                    text : 'Hari Hujan (hari)',
                    display: true,
                    color : this.NAMED_COLORS[2]
                  }
              }
            }
          }
        }); 
    }
    var i : number = 0
    for(i = 0; i < this.curahHariHujanChart.data.labels.length; i++){
      //add the new one 
      this.curahHariHujanChart.data.datasets.pop();
    }
    const newDataset = {
      type: 'bar',
      label: 'Curah Hujan',
      data: rainfall_rainfall,
      yAxisID: 'left-y-axis',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    };
    this.curahHariHujanChart.data.datasets.push(newDataset);

    const newDataset1 = {
      type: 'line',
      label: 'Hari Hujan',
      data: rainfall_rainy_day,
      yAxisID: 'right-y-axis',
      fill: true,
      borderColor: 'rgb(54, 162, 235)'
    };
    this.curahHariHujanChart.data.datasets.push(newDataset1);

    this.curahHariHujanChart.update()

  }


  removeData(chart : any) {
    chart.data.labels.splice(-1, 1); // remove the label first
      chart.data.datasets.forEach((dataset : any) => {
          dataset.data.pop();
      });
      chart.update();
  }
}
