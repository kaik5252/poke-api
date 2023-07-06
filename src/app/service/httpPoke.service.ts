import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpPokeService {
  private url: string = "https://pokeapi.co/api/v2/";
  next: string = "";

  constructor(private http: HttpClient) { }

  listing(): Observable<any> {
    return this.http.get(`${this.url}pokemon/`)
  }

  moreListing(): Observable<any> {
    return this.http.get(`${this.next}`)
  }

  listingSearch(search: any): Observable<any> {
    return this.http.get(`${this.url}pokemon/${search}`)
  }

  listingPokemon(index: any): Observable<any> {
    return this.http.get(`${this.url}pokemon/${index}`)
  }

  getPokemon(url: any): Observable<any> {
    return this.http.get(`${url}`)
  }

  getType(url: any): Observable<any> {
    return this.http.get(url)
  }
}
