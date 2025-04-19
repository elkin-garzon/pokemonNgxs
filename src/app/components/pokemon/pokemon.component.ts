import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ImagePokemonComponent } from '@components/image-pokemon/image-pokemon.component';
import { environment } from '@environments/environment.development';
import { Pokemon } from '@interfaces/pokemon.interface';
import { Store } from '@ngxs/store';
import { SelectPokemonBooleanAction, SelectPokemonIdAction } from '@store/selectPokemon/select-pokemon.actions';

@Component({
	selector: 'pn-pokemon',
	imports: [
		CommonModule,
		ImagePokemonComponent
	],
	templateUrl: './pokemon.component.html'
})
export class PokemonComponent {

	@Input() set pokemon(data: Pokemon) {
		this._pokemon = data;
		this.getId = this.idPokemon();
		this.urlImage = `${environment.URL_IMAGE_OFFICIAL}/${this.getId}.png`;
	};
	public _pokemon: Pokemon = {} as Pokemon;
	public getId: string = ''
	public urlImage: string = '';

	private store = inject(Store);

	public idPokemon(): string {
		return this._pokemon.url.split('/')[6];
	}

	public selectItem(pokemon: Pokemon): void {
		this.store.dispatch(new SelectPokemonIdAction(pokemon.url.split('/')[6]));
		this.store.dispatch(new SelectPokemonBooleanAction(true));
	}

}
