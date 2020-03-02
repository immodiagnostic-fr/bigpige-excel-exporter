import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Annonce } from '../Annonce';

@Component({
  selector: 'app-research-table',
  templateUrl: './research-table.component.html',
  styleUrls: ['./research-table.component.scss']
})
export class ResearchTableComponent implements OnInit {

 // result:any[];
 data:Annonce[];
  cols:any[];
  exportColumns: any[];

  cloned: { [s: string]: Annonce; } = {};
  

  constructor(private dataService:DataService) { }

  ngOnInit() {
    // this.dataService.getSearched().subscribe((res:any)=>{
    //   this.result = res;
    //   })
    this.dataService.getAnnonces().subscribe((res:any)=>{this.data = res;})

      // this.cols = [
      //   { field: 'id', header: 'Id' },
      //   { field: 'date', header: 'Date' },
      //   { field: 'site', header: 'Site' },
      //   { field: 'region', header: 'Region' },
      //   //  { field: 'departement', header: 'Departement' },
      //   { field: 'codepostal', header: 'Code Postal' },
      //   { field: 'ville', header: 'Ville' },
      //   { field: 'categorie', header: 'Categorie' },
      //   { field: 'prix', header: 'Prix' },
      // ];
      // this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  onRowEditInit(res: Annonce) {
    this.cloned[res.id] = {...res};
}

onRowEditSave(res: Annonce) {
    if (res.region) {
        delete this.cloned[res.id];
        //this.messageService.add({severity:'success', summary: 'Success', detail:'Car is updated'});
    }
    else {
       // this.messageService.add({severity:'error', summary: 'Error', detail:'Year is required'});
    }
}

onRowEditCancel(res: Annonce, index: number) {
    this.data[index] = this.cloned[res.id];
    delete this.cloned[res.id];
}



}
