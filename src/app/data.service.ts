import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Annonce } from './Annonce';
import { AnnonceSearchResultModel } from './AnnonceSearchResultModel';
import { Subject } from 'rxjs';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public searchResult = new Subject<AnnonceSearchResultModel>();

  constructor(private http: HttpClient) {}

  emitAnnonces(searchResult) {
    this.searchResult.next(searchResult);
  }

  getAnnonces() {
    return this.http.get(env.api_host + '/annonces');
  }

  postFiltered(filtered: any) {
    return this.http.post(env.api_host + "/annonces/recherche", filtered, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe((res: AnnonceSearchResultModel) => {
    	this.emitAnnonces(res);
    }, (error:any) => {
      this.emitAnnonces(new AnnonceSearchResultModel());
    })
  }

  saveSearched(name:string,research: any) {  
    return this.http.post(env.api_host + "/recherches", {name,research} , {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  UpdateNameReSearch(research: any) { 
    alert(research.id); 
    return this.http.put(env.api_host + "/recherches/" + research.id, research , {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  getSearched(){
    return this.http.get(env.api_host + '/');
  }

  getRegions() {
  	return this.http.get(env.api_host + "/regions");
  }

  getDepartements() {
  	return this.http.get(env.api_host + "/departements");
  }

  getCategories() {
  	return this.http.get(env.api_host + "/annonces/categories");
  }
}
