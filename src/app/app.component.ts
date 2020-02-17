import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from './data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filterForm: FormGroup;
  rangeValues: number[]=[0,100000];
  startDate:Date;
  stopDate:Date;
  fr:any;
  codePostal:string;
  ville:string;

  region: any;
  regions: any[] = []; //["Israel","France","Belgique","Bresil"];
  filteredRegionsSingle: any[];

  categorie: any;
  categories: any[] = []; //["Bureau","Appartement","Villa","Studio"];
  filteredCategoriesSingle: any[];
  data:any;

  loading:boolean = true;

  public get getStartDate() : string {
    return this.filterForm.get('startDate').value;
  }

  public get getStopDate() : string {
    return this.filterForm.get('stopDate').value;
  }

  constructor(private formBuilder: FormBuilder,private dataService:DataService){}

  filterRegionSingle(event) {
    let query = event.query;
    this.filteredRegionsSingle = this.filterRegion(query,this.regions);
  }

  filterRegion(query, regions: any[]):any[] {
    let filtered : any[] = [];
    for(let i = 0; i < regions.length; i++) {
      let region = regions[i];
      if(region.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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
      if(categorie.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        filtered.push(categorie);
      }
    }
    return filtered;
  }



  ngOnInit() {
    forkJoin(
      this.dataService.getAnnonces(),
      this.dataService.getRegions(),
      this.dataService.getCategories()
    ).subscribe((res:[any[], any[], any[]])=> {
      this.data = res[0];
      this.regions = res[1];
      this.categories = res[2].map(c => c.categorie);
      this.loading = false;
    });

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
      region: [null],
      categorie: [null],
      ville:[null],
      codePostal:[null,
      //[ Validators.required,Validators.maxLength(5),Validators.pattern(/[0-9]{5,}/)]
      ],
      startDate: [null],
      stopDate:[null],
      rangeValues: [this.rangeValues],
      telephone: [null]
    });
  }

  onFilter() {

    // const Region = this.filterForm.get('region').value;
    // const Categorie = this.filterForm.get('categorie').value;
    // const Ville =this.filterForm.get('ville').value;
    // const CodePostal =this.filterForm.get('codePostal').value;
    // const StartDate  = this.filterForm.get('startDate').value;
    // const StopDate  = this.filterForm.get('stopDate').value;
    // const RangeValues = this.filterForm.get('rangeValues').value;

    var ob:any = this.filterForm.getRawValue();
    console.log(ob);
    let filters = {
      "date_minimum": ob.startDate,
      "date_maximum": ob.stopDate,
      "prix_minimum": ob.rangeValues ? ob.rangeValues[0] : null,
      "prix_maximum": ob.rangeValues ? ob.rangeValues[1] : null,
      "region": ob.region ? ob.region.region_label : null,
      "ville": ob.ville,
      "code_postal": ob.codePostal,
      "categorie": ob.categorie,
      "telephone": ob.telephone
    }

    this.loading = true;
    this.dataService.postFiltered(filters).add(()=>{
      this.loading = false;
    });
  }

}
