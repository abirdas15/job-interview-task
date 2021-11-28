import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthServices} from "../../../services/auth.services";
import {DashboardService} from "../../../services/dashboard.service";

declare let $: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: []
})
export class SidenavComponent  implements OnInit  {
  current_route: any =  null

  Buildings: any = [];

  constructor(protected authService: AuthServices, protected dashboardService: DashboardService,protected router: Router) {
    router.events.subscribe((val) => {
      this.current_route = this.router.url
    })
    this.getBuildings();
  }
  ngOnInit(): void {
    this.initFunctions();
  }

  initFunctions() {
    $(document).mouseup(function (e:any) {
      const container = $('.outsideClick');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('active');
      }
    });

    /*Class Base ToggleDropdown Function*/
    $('.toggleDropdownFunctionClass').click( (e:any)=> {
      console.log(123)
      let trigger = $(e.target).closest('.options').find('.dropDownOption');
      if(trigger.hasClass('active')){
        trigger.removeClass('active');
      }else{
        trigger.addClass('active');
      }
    })
  }

  getBuildings() {
    this.dashboardService.apiGetBuildings().subscribe(res => {
      if (res.state === 200) {
        this.Buildings = res.building;
        this.dashboardService.updateBuildingId(res.building[0].id); // Update Current Selected Building ID
      }
    });
  }
}
