import { Component, OnInit } from '@angular/core';
import { HttpPokeService } from './../../../app/service/httpPoke.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search: string = "";
  notFound: boolean = false;
  loading: boolean = false;
  pokemonArray: Array<any> = new Array();

  constructor(private service: HttpPokeService, private router: Router) { }

  ngOnInit(): void {
    this.listingPoke()
  }

  handleClick(index: number) {
    this.router.navigate(['view'], { state: { index: index } });
  }

  searchPoke() {
    this.service.listingSearch(this.search).subscribe(pokemon => {
      if (this.search === "") {
        this.listingPoke();
        return;
      }

      this.notFound = true;
      this.pokemonArray = [];
      this.pokemonArray.push(pokemon)
    }, () => { this.notFound = false })
  }

  listingPoke() {
    this.loading = true;
    this.service.listing().subscribe(pokemon => {
      this.notFound = true;
      this.service.next = pokemon.next;
      this.pokemonArray = [];
      for (let i = 0; i < pokemon.results.length; i++) {
        this.getDetails(pokemon.results[i].url)
      }
    })
    this.loading = false;
  }

  moreListingPoke() {
    this.service.moreListing().subscribe(pokemon => {
      this.service.next = pokemon.next;
      for (let i = 0; i < pokemon.results.length; i++) {
        this.getDetails(pokemon.results[i].url)
      }
    })
  }

  getDetails(url: any) {
    this.service.getPokemon(url).subscribe(pokemon => {
      this.pokemonArray.push(pokemon)
    })
  }
}
