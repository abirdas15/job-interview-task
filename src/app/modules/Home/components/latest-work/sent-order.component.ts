import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../../services/dashboard.service";

@Component({
  selector: 'app-sent-order',
  templateUrl: './sent-order.component.html',
})
export class SentOrderComponent implements OnInit {

  buildingId:any = 0;
  sentOrder: any = [];
  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.currentBuildingId.subscribe(ID => {
      if (ID == null) {
        // do nothing
      } else {
        this.buildingId = ID;
        this.getSentOrder();
      }
    });
  }

  ngOnInit() {
  }

  getSentOrder() {
    this.dashboardService.apiGetSentOrder(this.buildingId).subscribe(res => {
      if (res !== null) {
        this.sentOrder = res;
      }
    });
  }
}
