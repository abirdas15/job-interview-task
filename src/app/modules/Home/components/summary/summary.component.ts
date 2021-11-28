import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../../services/dashboard.service";

@Component({
  selector: 'app-building-summary',
  templateUrl: './summary.component.html',
})
export class BuildingSummaryComponent implements OnInit {

  buildingId:any = 0;
  buildingSummary: any = null;

  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.currentBuildingId.subscribe(ID => {
      if (ID == null) {
        // do nothing
      } else {
        this.buildingId = ID;
        this.getBuildingSummary();
      }
    });
  }

  ngOnInit() {
  }
  getBuildingSummary() {
    this.dashboardService.apiGetBuildingSummary(this.buildingId).subscribe(res => {
      if (res !== null) {
        this.buildingSummary = res;
      }
    });
  }
}
