import { Component, OnInit } from '@angular/core';
import { HttpPokeService } from 'src/app/service/httpPoke.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search: string = "";
  searchFound: boolean = true;
  pokemonArray: Array<any> = new Array();

  constructor(private service: HttpPokeService) { }

  ngOnInit(): void {
    this.listingPoke();
  }

  searchPoke() {
    this.service.listingSearch(this.search).subscribe(pokemon => {
      if (this.search === "") {
        this.listingPoke();
        return;
      }
      this.searchFound = true;
      this.pokemonArray = [];
      this.pokemonArray.push(pokemon);

    }, () => { this.searchFound = false; return; });
  }

  listingPoke() {
    this.service.listing().subscribe(pokemon => {
      this.searchFound = true;
      this.service.next = pokemon.next;
      this.pokemonArray = [];
      for (let i = 0; i < pokemon.results.length; i++) {
        this.getDetails(pokemon.results[i].url);
      }
    });
  }

  moreListingPoke() {
    this.service.moreListing().subscribe(pokemon => {
      this.service.next = pokemon.next;
      for (let i = 0; i < pokemon.results.length; i++) {
        this.getDetails(pokemon.results[i].url);
      }
    });
  }

  getDetails(url: any) {
    this.service.getPokemon(url).subscribe(pokemon => {
      this.pokemonArray.push(pokemon);
    });
  }
}
