import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthServices} from "../../services/auth.services";
declare let $: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})

export class HomeComponent implements OnInit {


  constructor( private router: Router, protected authServices: AuthServices) {

  }

  toggleDropdown(e:any){

  };

  ngOnInit(): void {
    $(document).mouseup(function (e:any) {
      const container = $('.outsideClick');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('active');
      }
    });
  }
}
