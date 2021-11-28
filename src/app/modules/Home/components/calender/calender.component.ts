import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color} from 'ng2-charts';
import {DashboardService} from '../../../../services/dashboard.service';
import {CalendarOptions} from "@fullcalendar/angular";
declare let $: any;


let calendarRatio = 1.7;
let screenWidth = $(window).width()
if(screenWidth < 1300){
  calendarRatio = 1.5
}
if(screenWidth < 1100){
  calendarRatio = 1.5
}
if(screenWidth < 991){
  calendarRatio = 1.2
}


@Component({
  selector: 'app-calender-report',
  templateUrl: './calender.component.html',
})


export class CalenderComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    aspectRatio: calendarRatio,
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
  };
  buildingId:any =  0;
  constructor() {

  }

  ngOnInit() {

  }

}
