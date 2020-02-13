import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Annonce } from '../Annonce';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  data:Annonce[];
  cols:any[];

   constructor(private dataService:DataService){}

  ngOnInit() {
    this.dataService.getAnnonces().subscribe((res:any)=>{this.data = res.data;})
    
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'site', header: 'Site' },
      { field: 'region', header: 'Region' },
      { field: 'departement', header: 'Departement' },
      { field: 'codepostal', header: 'Code Postal' }
  ];

  }

  

}
