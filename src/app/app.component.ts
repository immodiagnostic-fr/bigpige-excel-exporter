import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bigpige-excel-exporter';
  rangeValues: number[]=[0,10000];
  startDate:Date;
  stopDate:Date;
  fr:any;
  codePostal:string;
  ville:string;

  region: any;
  regions: any[] = ["Israel","France","Belgique","Bresil"];
  filteredRegionsSingle: any[];

  categorie: any;
  categories: any[]= ["Bureau","Appartement","Villa","Studio"];
  filteredCategoriesSingle: any[];
  min:Date;

  mySelect(){   
  this.min = this.startDate;
  }
  

  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  filterRegionSingle(event) {
    let query = event.query;    
    this.filteredRegionsSingle = this.filterRegion(query,this.regions);   

  }
    
  filterRegion(query, regions: any[]):any[] {    
    let filtered : any[] = [];
    for(let i = 0; i < regions.length; i++) {
        let region = regions[i];
        if(region.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(region);
        }
    }   
    return filtered;
}

filterCategorieSingle(event) {
  let query = event.query;    
  this.filteredCategoriesSingle = this.filterCategorie(query,this.categories);   
}
  
filterCategorie(query, categories: any[]):any[] {    
  let filtered : any[] = [];
  for(let i = 0; i < categories.length; i++) {
      let categorie = categories[i];
      if(categorie.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(categorie);
      }
  }   
  return filtered;
}



  ngOnInit() {
    this.fr = {             
      monthNames: [ "janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre" ],
      monthNamesShort: [ "jan","fév","mar","avr","mai","jun","jul","aoû","sep","oct","nov","déc" ],
      today: 'today',
      clear: 'clear'
  }
  
    this.initForm();
  }

  initForm() {
    this.filterForm = this.formBuilder.group({      
      region: [''],
      categorie: [''],
      ville:[''],
      codePostal:[''
      //,[ Validators.required,Validators.maxLength(5),Validators.pattern(/[0-9]{5,}/)]
    ],
      startDate: [''],
      stopDate:[''],
      rangeValues: [this.rangeValues]
      
    });
  }

  

  onFilter() {
    
    const Region = this.filterForm.get('region').value;
    const Categorie = this.filterForm.get('categorie').value;
    const Ville =this.filterForm.get('ville').value;
    const CodePostal =this.filterForm.get('codePostal').value;
    const StartDate  = this.filterForm.get('startDate').value;
    const StopDate  = this.filterForm.get('stopDate').value;
    const RangeValues = this.filterForm.get('rangeValues').value;
    console.log(CodePostal);
  }

}
