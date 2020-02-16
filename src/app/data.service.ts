import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Annonce } from './Annonce';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  annonces: Annonce[] = [];
  annoncessSubject = new Subject<Annonce[]>();

  constructor(private http: HttpClient) {
    
  }

  emitAnnonces() {
    this.annoncessSubject.next(this.annonces);
  }

  getAnnonces() {
    return this.http.get('assets/annonces.json');
  }

  postFiltered(filtered: any) {
    return this.http.post("https://bigpige-excel-exporter-api.herokuapp.com/annonces", filtered, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }
}
