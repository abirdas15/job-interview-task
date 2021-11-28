import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../../services/dashboard.service";
declare let $: any;
declare let toastr: any;

@Component({
  selector: 'app-report-note',
  templateUrl: './notes.component.html',
})

export class ReportNoteComponent implements OnInit {
  NotesDelete:any = []
  Data: any = {
    note: '',
  };
  save = false;
  DeleteNoteLoading = false;
  buildingId:any =  0;
  Note: any = null;

  constructor(protected dashboardService: DashboardService) {
    this.dashboardService.currentBuildingId.subscribe(ID => {
      if (ID == null) {
        // do nothing
      } else {
        this.buildingId = ID;
        this.getNote();
      }
    });
  }

  ngOnInit() {}

  getNote() {
    this.dashboardService.apiGetNote(this.buildingId).subscribe(res => {
      if (res.data !== null) {
        this.Note = res.data;
      }
    });
  }

  addNote() {
    this.save = true;
    this.dashboardService.apiAddNote(this.Data, this.buildingId).subscribe(res => {
      toastr.success('Note added successfully');
      toastr.options.closeButton = true;
      $('#note_Modal').modal('hide');
      this.save = false;
      this.getNote();
    });
  }

  OpenDeleteModal(){
    $('#NotesDelete').modal('show')
  }

  CloseDeleteModal(){
    $('#NotesDelete').modal('hide')
  }

  deleteNote(){
    this.DeleteNoteLoading = true;
    $.each(this.NotesDelete, (i:any, v:any) => {
      this.dashboardService.apiDeleteNote('', this.buildingId, v.id).subscribe(res => {
        console.log('Delete Success')
        this.getNote();
        this.DeleteNoteLoading = false;
        this.CloseDeleteModal()
        this.NotesDelete = []
      });
    })
  }

  SelectNotes(event:any, NotesId:any){
    if ($(event.target).prop('checked') == true) {
      this.NotesDelete.push({ id: NotesId })
    } else {
      $.each(this.NotesDelete, (i:any, v:any) => {
        if (v.id == NotesId){
          this.NotesDelete.splice(i, 1)
        }
      })
    }
  }

  openNoteModal() {
    $('#note_Modal').modal('show');
  }
}
