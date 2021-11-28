import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../../services/dashboard.service";

@Component({
  selector: 'app-report-management',
  templateUrl: './management-report.component.html',
})
export class ReportManagementComponent implements OnInit {

  buildingId:any = 0;
  managementReport: any = null;
  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.currentBuildingId.subscribe(ID => {
      if (ID == null) {
        // do nothing
      } else {
        this.buildingId = ID;
        this.getManagementReport();
      }
    });
  }

  ngOnInit() {
  }
  getManagementReport() {
    this.dashboardService.apiGetManagementReport(this.buildingId).subscribe(res => {
      if (res !== null) {
        this.managementReport = res;
      }
    });
  }
}
