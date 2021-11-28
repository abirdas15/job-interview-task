import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServices} from "../../../services/auth.services";
declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent   implements OnInit  {

  constructor( private router: Router, protected authServices: AuthServices) {

  }

  ngOnInit(): void {
    $(document).mouseup(function (e:any) {
      const container = $('.outsideClick1, .outsideClick');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('active');
      }
    });
  }

  toggleDropdown(e:any){
    let trigger = $(e.target).closest('.options').find('.dropDownOption');
    if(trigger.hasClass('active')){
      trigger.removeClass('active');
    }else{
      trigger.addClass('active');
    }
  };

  logout() {
    this.authServices.logout();
    setTimeout(() => {
      this.router.navigate(['']);
    });
  }
}
