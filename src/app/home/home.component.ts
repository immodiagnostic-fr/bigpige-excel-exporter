import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { forkJoin } from 'rxjs';
import { Annonce } from '../Annonce';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filterForm: FormGroup;
  rangeValues: number[]=[0,1000000];
  startDate:Date;
  stopDate:Date;
  fr:any;
  codePostal:string;
  ville:string;
  data:Annonce[]=[];
  filters:any;

  selectedRegions: string[] = [];
  regions: SelectItem[]=[];
 
  selectedCategories: string[] = []; 
  categories: SelectItem[]=[] ;
  
  selectedDepartements: string[] = []; 
  departements:  SelectItem[]=[] ;

  typeTelephone = ['1'];

  loading:boolean = true;

  public get getStartDate() : string {
    return this.filterForm.get('startDate').value;
  }

  public get getStopDate() : string {
    return this.filterForm.get('stopDate').value;
  }

  constructor(private formBuilder: FormBuilder,private dataService:DataService){
    
  }


  ngOnInit() {
    forkJoin(
      this.dataService.getAnnonces(),
      this.dataService.getRegions(),
      this.dataService.getCategories(),
      this.dataService.getDepartements()
    ).subscribe((res:[any[], any[], any[], any[]])=> {
      this.data = res[0];
      //this.regions = res[1];
      //this.categories = res[2].map(c => c.categorie);     
      this.regions = [];
          for (let i = 0; i < res[1].length; i++) {
              this.regions.push({label: res[1][i].nom, value:  res[1][i].region_label});
          }
      this.categories = [];
          for (let i = 0; i < res[2].length; i++) {
              this.categories.push({label: res[2][i].categorie, value:  res[2][i].categorie});
          }
          this.departements = [];
          for (let i = 0; i < res[3].length; i++) {
              this.departements.push({label: res[3][i].departement_code + " "+ res[3][i].departement_nom, value:  res[3][i].departement_code});
          }    
          this.loading = false;
    });

    if(this.dataService.historyWanted){
       console.log(this.dataService.historyWanted);
       
       this.dataService.postFiltered(this.dataService.historyWanted).add(()=>{
        this.dataService.historyWanted = null;
      });
       
    }
    

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
      selectedRegions: [null],
      selectedCategories: [null],
      selectedDepartements:[null],
      ville:[null],
      codePostal:[null,
      //[ Validators.required,Validators.maxLength(5),Validators.pattern(/[0-9]{5,}/)]
      ],
      startDate: [null],
      stopDate:[null],
      rangeValues: [this.rangeValues],
      telephone: [null],
      typeTelephone: [this.typeTelephone
        //,Validators.required
      ]
    });
  }

  onFilter() {

    var ob:any = this.filterForm.getRawValue();
    this.filters = {
      "date_minimum":  ob.startDate ? ob.startDate : null,
      "date_maximum":  ob.stopDate ? ob.stopDate : null,
      "prix_minimum":  ob.rangeValues ? ob.rangeValues[0] : null,
      "prix_maximum":  ob.rangeValues ? ob.rangeValues[1] : null,
      "region":  ob.selectedRegions ? ob.selectedRegions : null,
      "ville":  ob.ville ? ob.ville : null,
      "code_postal":  ob.codePostal ? ob.codePostal : null,
      "categorie":  ob.selectedCategories ? ob.selectedCategories : null,
      "departement_code": ob.selectedDepartements ? ob.selectedDepartements : null,
      "telephone":  ob.telephone ? ob.telephone : null,
      "type_telephone" : ob.typeTelephone ? ob.typeTelephone : null
    }

    this.loading = true;
    this.dataService.postFiltered(this.filters).add(()=>{
      this.loading = false;
    });
  }
  
  
}
