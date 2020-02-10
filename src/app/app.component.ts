import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bigpige-excel-exporter';
  rangeValues: number[] = [20,80];

  region: any;
  regions: any[] = ["Israel","France","Belgique","Bresil"];
  filteredRegionsSingle: any[];

  country: any;
  countries: any[];
  filteredCountriesSingle: any[];



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



  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.filterForm = this.formBuilder.group({
      rangeValues: ['', Validators.required],
      region: ['', Validators.required]
      
      
    });
  }

  onFilter() {
    const RangeValues = this.filterForm.get('rangeValues').value;
    const Region = this.filterForm.get('region').value;
    console.log(Region);
  }

}
