import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpPokeService } from './../../../app/service/httpPoke.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  index: any;
  pokemonArray: Array<any> = new Array();

  constructor(private service: HttpPokeService, private router: Router) { }

  ngOnInit(): void {
    this.index = history.state.index;

    if(this.index === null || this.index === undefined) {
      this.router.navigate(['home']);
    }

    this.listing();
  }

  listing() {
    this.service.listingPokemon(this.index).subscribe((e) => {
      this.pokemonArray.push(e)
    })
  }
}
