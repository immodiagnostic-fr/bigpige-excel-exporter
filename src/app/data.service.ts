import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Annonce } from './Annonce';
import { Subject } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private annonces: Annonce[] = [];
  public annoncesSubject = new Subject<Annonce[]>();

  constructor(private http: HttpClient) {}

  emitAnnonces() {
    this.annoncesSubject.next(this.annonces);
  }

  getAnnonces() {
    return this.http.get(env.api_host + '/annonces');
  }

  postFiltered(filtered: any) {
    return this.http.post(env.api_host + "/annonces", filtered, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe((res: Annonce[]) => {
    	this.annonces = res;
    	this.emitAnnonces();
    })
  }

  getRegions() {
  	return this.http.get(env.api_host + "/regions");
  }

  getCategories() {
  	return this.http.get(env.api_host + "/annonces/categories");
  }
}
