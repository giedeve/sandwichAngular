import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sandwich } from './sandwich';

@Injectable({
  providedIn: 'root'
})
export class SandwichService {

  private url = "http://localhost:3000/sandwiches";

  constructor(private httpClient: HttpClient) { }

  getSandwiches() {
    return this.httpClient.get(this.url).toPromise();
  }

  getSandwich(sandwichId: string) {
    return this.httpClient.get(`${this.url}/${sandwichId}`).toPromise();
  }

  postSandwich(sandwich: Sandwich) {
    return this.httpClient.post(this.url, sandwich).toPromise();
  }

  findSandwiches(query: string, sort: string, order: 'asc' | 'desc') {
    return this.httpClient.get(`${this.url}?q=${query}&_sort=${sort}&_order=${order}`).toPromise();
  }
}
