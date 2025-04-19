import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListPokemonComponent } from '@components/list-pokemon/list-pokemon.component';
import { ResultPokemns } from '@interfaces/pokemon.interface';
import { PokemonService } from '@services/pokemon/pokemon.service';

@Component({
	selector: 'pn-home',
	imports: [
		ListPokemonComponent
	],
	templateUrl: './home.component.html'
})
export class HomeComponent  {
	
	
}
