import { Component, OnInit, inject } from '@angular/core';
import { HttpPokeService } from 'src/app/service/httpPoke.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchValue = "";
  notFound = false;
  loading = false;
  searching = false;
  pokemonArray: Array<any> = new Array();

  private service: HttpPokeService = inject(HttpPokeService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.listingPoke()
  }

  handleClick(index: number) {
    this.router.navigate(['/view'], { state: { index: index } });
  }

  searchClean() {
    this.searchValue = "";
    this.notFound = false;
    this.searching = false;
    this.listingPoke()
  }

  async searchPoke() {
    if (this.searchValue === "") {
      this.searchClean();
      return
    }

    this.loading = true;
    this.searchValue = this.searchValue.toLowerCase();
    try {
      const pokemon = await new Promise((resolve, reject) => {
        this.service.listingSearch(this.searchValue).subscribe(
          (pokemon) => {
            resolve(pokemon)
          },
          (error) => {
            reject(error)
          })
      });

      this.notFound = false;
      this.searching = true;
      this.pokemonArray = [];
      this.pokemonArray.push(pokemon)

    } catch (error) {
      this.notFound = true
    }

    this.loading = false
  }

  async listingPoke() {
    this.loading = true;
      const pokemon = await new Promise((resolve, reject) => {
        this.service.listing().subscribe(
          (pokemon) => {
          this.service.next = pokemon.next;
          this.pokemonArray = [];
          for (let i = 0; i < pokemon.results.length; i++) {
            this.getDetails(pokemon.results[i].url)
          }
          resolve(null)
        }, 
        (error) => {
          reject(error)
        })
      });

    this.loading = false
  }

  async moreListingPoke() {
    this.loading = true;
    await new Promise((resolve, reject) => {
      this.service.moreListing().subscribe(
        (pokemon) => {
          this.service.next = pokemon.next;
          for (let i = 0; i < pokemon.results.length; i++) {
            this.getDetails(pokemon.results[i].url)
          }
          resolve(null)
        },
        (error) => {
          reject(error)
        }
      )
    });

    this.loading = false
  }


  async getDetails(url: any) {
    await new Promise(() => {
      this.service.getPokemon(url).subscribe(
        (pokemon) => {
          this.pokemonArray.push(pokemon)
        }
      )
    })
  }
}
