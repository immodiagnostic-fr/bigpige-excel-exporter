import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Annonce } from '../Annonce';
import { Router } from '@angular/router';


@Component({
  selector: 'app-research-table',
  templateUrl: './research-table.component.html',
  styleUrls: ['./research-table.component.scss']
})
export class ResearchTableComponent implements OnInit {

 // result:any[];
 data:any[];
  cols:any[];
  exportColumns: any[];

  cloned: { [s: string]: any; } = {};
  

  constructor(private dataService:DataService , private router:Router) { }

  ngOnInit() {
    this.dataService.getSearched().subscribe((res:any)=>{
      this.data = res;
      })
    //this.dataService.getAnnonces().subscribe((res:any)=>{this.data = res;})

  }

  onRowEditInit(res: any) {
    this.cloned[res.id] = {...res};
}

onRowEditSave(res: any) {   
    this.dataService.UpdateNameReSearch(res.id,res.nom).subscribe((reponse:any)=>{
            if (!reponse.error) {        
                  delete this.cloned[res.id];
                  alert("Le nom " + res.name + " a été modifié");
            }
            else{
                  alert(reponse.message);
            }   
        })
}

onRowEditCancel(res: any, index: number) {
    this.data[index] = this.cloned[res.id];
    delete this.cloned[res.id];
}

rechercher(ob:any){
    // this.dataService.historyWanted = {        
    //     "date_minimum":  ob.startDate ? ob.startDate : null,
    //     "date_maximum":  ob.stopDate ? ob.stopDate : null,
    //     "prix_minimum":  ob.rangeValues ? ob.rangeValues[0] : null,
    //     "prix_maximum":  ob.rangeValues ? ob.rangeValues[1] : null,
    //     "region":  ob.selectedRegions ? ob.selectedRegions : null,
    //     "ville":  ob.ville ? ob.ville : null,
    //     "code_postal":  ob.codePostal ? ob.codePostal : null,
    //     "categorie":  ob.selectedCategories ? ob.selectedCategories : null,
    //     "departement_code": ob.selectedDepartements ? ob.selectedDepartements : null,
    //     "telephone":  ob.telephone ? ob.telephone : null,
    //     "type_telephone" : ob.typeTelephone ? ob.typeTelephone : null
    //   }
    this.dataService.historyWanted = ob.filtres;
    //alert( this.dataService.historyWanted.region)
    this.router.navigate(['/home']);
}




}
