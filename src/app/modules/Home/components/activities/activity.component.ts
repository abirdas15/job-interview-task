import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../../services/dashboard.service';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity.component.html',
})
export class ActivityReportComponent implements OnInit {


  buildingId:any =  0;
  ActivityFeed: any = null;
  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.currentBuildingId.subscribe(ID => {
      if (ID == null) {
        // do nothing
      } else {
        this.buildingId = ID;
        this.getActivityFeed();
      }
    });
  }

  ngOnInit() {
  }
  getActivityFeed() {
    this.dashboardService.apiGetActivityFeed(this.buildingId).subscribe(res => {
      if (res !== null) {
        const rv = [];
        for (let i = 0; i < Object.keys(res).length; i++) {
          const keys = Object.keys(res);
          const v = res[keys[i]];
          const itemInfo:any = [];
          v.forEach((info:any) => {
            const items = info.split(' - ');
            itemInfo.push({
              time: items[0] !== undefined ? items[0] : '',
              text: items[1] !== undefined ? items[1] : '',
              user: items[2] !== undefined ? items[2] : ''
            });
          });
          const dt = {
            title: '-',
            dateTime: keys[i],
            logs: itemInfo
          };
          rv.push(dt);
        }
        this.ActivityFeed = rv;
      }
    });
  }

}
