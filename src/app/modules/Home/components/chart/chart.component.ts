import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../../services/dashboard.service";
declare let $: any;
declare let Chart: any;
@Component({
  selector: 'app-donut-chart',
  templateUrl: './chart.component.html',
})
export class DonutChartComponent implements OnInit {
  buildingId:any =  0;
  Chart_title:any = [];
  Chart_data:any = [];

  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.currentBuildingId.subscribe(ID => {
      if (ID == null) {
        // do nothing
      } else {
        this.buildingId = ID;
        this.getCaseGraph();
      }
    });
  }

  ngOnInit() {

  }
  initChart() {
    this.ConfigFLabels()
    const data = {
      labels: this.Chart_title,
      datasets: [{
        label: '# of Votes',
        data: this.Chart_data,
        backgroundColor: [
          '#4FADEA',
          '#BC5FE3',
          '#BFD40C',
        ],
        borderColor: [
          '#4FADEA',
          '#BC5FE3',
          '#BFD40C',
        ],
        borderWidth: 1
      }]
    };
    const ctx = document.getElementById('_dash_donut_chart');
    new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });

  }

  ConfigFLabels() {
    Chart.defaults.global.tooltips.custom = function(tooltip: any) {
      // Tooltip Element
      let tooltipEl: any = document.getElementById('chartjs-tooltip');

      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
      }

      // Set Text
      if (tooltip.body) {
        let total = 0;

        // get the value of the datapoint
        let title = this._data.labels[tooltip.dataPoints[0].index].toLocaleString();
        let value = this._data.datasets[tooltip.dataPoints[0].datasetIndex].data[tooltip.dataPoints[0].index].toLocaleString();

        // calculate value of all datapoints
        this._data.datasets[tooltip.dataPoints[0].datasetIndex].data.forEach(function(e: any) {
          total += e;
        });

        // calculate percentage and set tooltip value
        tooltipEl.innerHTML = '<span>'+title+' <span class="value">'+value+'%</span></span>';
      }

      // calculate position of tooltip
      let centerX = (this._chartInstance.chartArea.left + this._chartInstance.chartArea.right) / 2;
      let centerY = ((this._chartInstance.chartArea.top + this._chartInstance.chartArea.bottom) / 2);

      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1;
      tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
    };
  }
  getCaseGraph() {
    let FormData = {
      from: "2021-08-28",
      to: "2021-11-28",
      type: 1
    }
    this.dashboardService.apiGetCaseGraph(FormData, this.buildingId).subscribe(res => {
      $.each(res.data, (i: number, v:any) => {
        this.Chart_title.push(v.c[0].v)
        this.Chart_data.push(v.c[1].v)
      })
      setTimeout(() => {
        this.initChart()
      }, 1000);
    });
  }
}
