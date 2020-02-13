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
  selectedAnnonces:Annonce[];
  cols:any[];
  exportColumns: any[];

   constructor(private dataService:DataService){}

  ngOnInit() {
    this.dataService.getAnnonces().subscribe((res:any)=>{this.data = res.data;})
    
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'site', header: 'Site' },
      { field: 'region', header: 'Region' },
    //  { field: 'departement', header: 'Departement' },
      { field: 'codepostal', header: 'Code Postal' },
       { field: 'ville', header: 'Ville' },
       { field: 'categorie', header: 'Categorie' },
       { field: 'prix', header: 'Prix' },
    
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.exportColumns, this.data);
            doc.save('primengTable.pdf');
        })
    })
}


exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getData());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "primengTable");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}



getData() {
    //j'ai pas compris cette fonction j'ai mis code postal au hasard
    let annonces = [];
    for(let annonce of this.data) {
      annonce.codepostal = annonce.codepostal.toString();
        annonces.push(annonce);
    }
    return annonces;
}
  

}
