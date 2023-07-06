import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpPokeService } from 'src/app/service/httpPoke.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  index: any;
  pokemonArray: Array<any> = new Array();

  constructor(private service: HttpPokeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.index = params.get('id')
    });

    this.listing();
  }

  listing() {
    this.service.listingPokemon(this.index).subscribe((e) => {
      this.pokemonArray.push(e)
    })
  }
}
