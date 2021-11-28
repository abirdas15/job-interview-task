import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../../services/dashboard.service";

@Component({
  selector: 'app-require-action',
  templateUrl: './require-action.component.html',
})
export class RequireActionComponent implements OnInit {
  buildingId:any =  0;
  requireAction: any = null;
  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.currentBuildingId.subscribe(ID => {
      if (ID == null) {
        // do nothing
      } else {
        this.buildingId = ID;
        this.getRequireAction();
      }
    });
  }

  ngOnInit() {}

  getRequireAction() {
    this.dashboardService.apiGetRequireAction(this.buildingId).subscribe(res => {
      if (res !== null) {
        this.requireAction = res;
      }
    });
  }
}
