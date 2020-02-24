import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from './data.service';
import { forkJoin } from 'rxjs';
import { Annonce } from './Annonce';
import { SelectItem } from 'primeng/api/selectitem';

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

 
  selectedCategories: string[] = [];
  data:Annonce[]=[];
  categories: SelectItem[]=[] ; //["Bureau","Appartement","Villa","Studio"];
  filteredCategoriesSingle: any[];


  loading:boolean = true;

  public get getStartDate() : string {
    return this.filterForm.get('startDate').value;
  }

  public get getStopDate() : string {
    return this.filterForm.get('stopDate').value;
  }

  constructor(private formBuilder: FormBuilder,private dataService:DataService){

    this.dataService.getAnnonces().subscribe((res:any)=>{this.data = res.data;
      this.categories = [];
          for (let i = 0; i < this.data.length; i++) {
              this.categories.push({label:this.data[i].ville, value: this.data[i].ville});
          }
    })
    
  }

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
      selectedCategories: [null],
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
      "date_minimum":  ob.startDate ? ob.startDate : null,
      "date_maximum":  ob.stopDate ? ob.stopDate : null,
      "prix_minimum":  ob.rangeValues ? ob.rangeValues[0] : null,
      "prix_maximum":  ob.rangeValues ? ob.rangeValues[1] : null,
      "region":        ob.region ? [ob.region.region_label] : null,
      "selectedCategories":     ob.categorie ? ob.categorie : null,
      "telephone":     ob.telephone ? ob.telephone : null
    }

    this.loading = true;
    this.dataService.postFiltered(filters).add(()=>{
      this.loading = false;
    });
  }

}
