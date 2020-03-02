import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Annonce } from '../Annonce';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() filterResult:any;
  data:Annonce[];
  selectedAnnonces:Annonce[];
  cols:any[];
  exportColumns: any[];
  searchSubscription:Subscription;
  result_size:number;
  result_csv_download_link:string;
  displayBasic: boolean;
  text:string;

  constructor(private dataService:DataService){}

  ngOnInit() {
    this.dataService.getAnnonces().subscribe((res:any)=>{this.data = res;})

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'site', header: 'Site' },
      { field: 'region', header: 'Region' },
      //  { field: 'departement', header: 'Departement' },
      { field: 'codepostal', header: 'Code Postal' },
      { field: 'ville', header: 'Ville' },
      { field: 'categorie', header: 'Categorie' },
      { field: 'prix', header: 'Prix' }
      
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.searchSubscription = this.dataService.searchResult.subscribe(searchResult => {
      this.data = searchResult.list;
      this.result_size = searchResult.size;
      this.result_csv_download_link = searchResult.file;
    })
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

  showDialog(){
    this.displayBasic=true;
  }
  
  sauvegarder(){
    this.dataService.saveSearched(this.text,this.filterResult).subscribe((res:any)=>{
    console.log(this.text);
    if(!res.error){
    this.text=null;
    this.displayBasic = false;
    }
    else{
      alert(res.message);
    }
    });
   
  }
}
