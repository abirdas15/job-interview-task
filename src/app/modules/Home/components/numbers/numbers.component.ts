import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../../services/dashboard.service";
declare let $: any;
declare let toastr: any;
@Component({
  selector: 'app-report-number',
  templateUrl: './numbers.component.html',
})
export class ReportNumberComponent implements OnInit {

  buildingId:any =  0;
  save = false;
  Number: any = null;
  DeleteNumber:any = [];
  DeleteNumberLoading: any = false;
  Data: any = {
    name: '',
    number: '',
  };

  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.currentBuildingId.subscribe(ID => {
      if (ID == null) {
        // do nothing
      } else {
        this.buildingId = ID;
        this.getNumbers();
      }
    });
  }

  ngOnInit() {}
  getNumbers() {
    this.dashboardService.apiGetNumber(this.buildingId).subscribe(res => {
      if (res !== null) {
        this.Number = res;
      }
    });
  }

  OpenDeleteModal(){
    $('#NumbersDelete').modal('show')
  }
  CloseDeleteModal(){
    $('#NumbersDelete').modal('hide')
  }
  deleteNumber(){
    this.DeleteNumberLoading = true;
    $.each(this.DeleteNumber, (i:any, v:any) => {
      let param = {id: v.id}
      this.dashboardService.apiDeleteNumbers( this.buildingId, param).subscribe(res => {
        console.log('Delete Success')
        this.getNumbers();
        this.DeleteNumberLoading = false;
        this.CloseDeleteModal()
        this.DeleteNumber = []
      });
    })
  }
  SelectNumbers(event:any, NotesId:any){
    if ($(event.target).prop('checked') == true) {
      this.DeleteNumber.push({ id: NotesId })
    } else {
      $.each(this.DeleteNumber, (i:any, v:any) => {
        if (v.id == NotesId){
          this.DeleteNumber.splice(i, 1)
        }
      })
    }
  }
  AddNumber() {
    this.save = true;
    this.dashboardService.apiAddNumber(this.Data, this.buildingId).subscribe(res => {
      if (res.state === 200) {
        toastr.success('Number added successfully');
        toastr.options.closeButton = true;
        $('#number_Modal').modal('hide');
        this.save = false;
        this.getNumbers();
      }
    });
  }
  openNumberModal() {
    $('#number_Modal').modal('show');
  }
}
