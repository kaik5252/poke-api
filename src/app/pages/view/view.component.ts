import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpPokeService } from 'src/app/service/httpPoke.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private index = 0;
  pokemonArray: Array<any> = new Array();

  private service: HttpPokeService = inject(HttpPokeService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    if(history.state.index === undefined) this.router.navigate(['/home']);
    this.index = history.state.index;
    
    this.listing();
  }

  listing() {
    this.service.listingPokemon(this.index).subscribe((e) => {
      this.pokemonArray.push(e)
    })
  }
}
