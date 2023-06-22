import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Chart } from "chart.js/auto";

@Component({
  selector: 'app-dashboard-rekomendator',
  templateUrl: './dashboard-rekomendator.page.html',
  styleUrls: ['./dashboard-rekomendator.page.scss'],
})
export class DashboardRekomendatorPage implements OnInit, AfterViewInit {

  @ViewChild("barCanvas") barCanvas: any;
  @ViewChild("doughnutCanvas") doughnutCanvas: any;
  @ViewChild("lineCanvas") lineCanvas: any;
  @ViewChild("radarCanvas") radarCanvas: any;
  @ViewChild("scatterCanvas") scatterCanvas: any;
 
  scatterChart: any;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  radarChart : any;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
    this.lineChartMethod();
    this.radarChartMethode();
    this.scatterChartMethode();

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
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

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['BJP', 'Congress', 'AAP', 'CPM', 'SP'],
        datasets: [{
          label: '# of Votes',
          data: [50, 29, 15, 10, 7],
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

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
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

  scatterChartMethode(){
    
    this.scatterChart = new Chart(this.scatterCanvas.nativeElement,
      {
        type: 'scatter',
        data:{
          labels: [
            'January',
            'February',
            'March',
            'April'
          ],
          datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
          }, {
            type: 'line',
            label: 'Line Dataset',
            data: [30, 20, 10, 50],
            fill: false,
            borderColor: 'rgb(54, 162, 235)'
          }]
        },
        options: {
          animations: {
           
          },
         },
      }); 
  }

}
