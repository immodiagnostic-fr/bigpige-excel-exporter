import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filterForm: FormGroup;
  rangeValues: number[]=[0,10000];
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
    this.dataService.getAnnonces().subscribe((res:any)=>{this.data = res;});
    this.dataService.getRegions().subscribe((res:any)=>{this.regions = res;});
    this.dataService.getCategories().subscribe((res:any)=>{this.categories = res.map(c => c.categorie);});

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
      rangeValues: [this.rangeValues],
      telephone: ['']
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
    //var ob:any = this.filterForm.getRawValue();
   // this.dataService.postFiltered(this.filterForm.getRawValue()).
    
  }

}
