import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getAnnonces() {
    return this.http.get('assets/annonces.json');
  }

  getRegions() {
  	return this.http.get(env.api_host + "/regions");
  }

  getCategories() {
  	return this.http.get(env.api_host + "/annonces/categories");
  }
}
