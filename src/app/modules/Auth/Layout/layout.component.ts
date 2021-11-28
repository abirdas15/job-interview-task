import {Component, OnInit} from '@angular/core';

declare let $: any;
@Component({
  selector: 'app-auth-layout',
  templateUrl: './layout.component.html',
  styleUrls: []
})
export class AuthLayoutComponent  implements OnInit {


  ngOnInit(): void {
    this.bgSlideAnimation()
  }

  bgSlideAnimation() {
    let slides:any = $(".image-animation");
    let current = 0;
    setInterval(() =>{
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
      }
      current = (current != slides.length - 1) ? current + 1 : 0;
      slides[current].style.opacity = 1;
    }, 30000);
  }

}
