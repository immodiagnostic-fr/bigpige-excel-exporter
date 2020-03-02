import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from './data.service';
import { forkJoin } from 'rxjs';
import { Annonce } from './Annonce';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

constructor(){

}
ngOnInit(){
  
}
  // reset(){
  //  // this.filterForm.reset();
  //   this.initForm();
  // }

}
