import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { FileSaverModule } from 'ngx-filesaver';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import {AuthGuard} from "./guards/auth/auth.guard";
import {LoginGuard} from "./guards/login/login.guard";

//Auth Layout
import {AuthLayoutComponent} from "./modules/Auth/Layout/layout.component";

//Auth Pages
import {LoginComponent} from "./modules/Auth/login/login.component";
import {ResetComponent} from "./modules/Auth/reset/reset.component";

//Front Panel Layout
import {FrontLayoutComponent} from "./modules/Layout/layout.component";

// Front Pages
import {SidenavComponent} from "./modules/Includes/sidenav/sidenav.component";
import {HeaderComponent} from "./modules/Includes/header/header.component";

//Home
import {HomeComponent} from "./modules/Home/home.component";
// Home Components

import {CalenderComponent} from "./modules/Home/components/calender/calender.component";
import {ActivityReportComponent} from "./modules/Home/components/activities/activity.component";
import {ReportNumberComponent} from "./modules/Home/components/numbers/numbers.component";
import {ReportNoteComponent} from "./modules/Home/components/notes/notes.component";
import {SentOrderComponent} from "./modules/Home/components/latest-work/sent-order.component";
import {BuildingSummaryComponent} from "./modules/Home/components/summary/summary.component";
import {ReportManagementComponent} from "./modules/Home/components/management-report/management-report.component";
import {RequireActionComponent} from "./modules/Home/components/require-action/require-action.component";

import {DonutChartComponent} from "./modules/Home/components/chart/chart.component";


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


const routes: Routes = [
  {path: '', component: AuthLayoutComponent,
    canActivate: [LoginGuard],
    children:[
      {path: '', component: LoginComponent},
      {path: 'reset', component: ResetComponent}
    ]
  },
  {path: 'bm', component: FrontLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {path: 'dashboard', component: HomeComponent},
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    //Layout Auth
    AuthLayoutComponent,

    //Auth Pages
    LoginComponent,ResetComponent,

    //Layout Front
    FrontLayoutComponent,

    //Includes
    SidenavComponent,HeaderComponent,

    //Dashboard
    HomeComponent,

    //Dashboard Components
    CalenderComponent,ActivityReportComponent,ReportNumberComponent,ReportNoteComponent,SentOrderComponent,BuildingSummaryComponent,
    ReportManagementComponent,RequireActionComponent,DonutChartComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ChartsModule,
    FullCalendarModule,
    FileSaverModule,
  ],
  providers: [
    AuthGuard, LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
