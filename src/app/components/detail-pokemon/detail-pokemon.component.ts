import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ImagePokemonComponent } from '@components/image-pokemon/image-pokemon.component';
import { environment } from '@environments/environment.development';
import { DetailPokemon, Sprites } from '@interfaces/pokemon.interface';
import { PokemonService } from '@services/pokemon/pokemon.service';

@Component({
	selector: 'pn-detail-pokemon',
	imports: [
		CommonModule,
		ImagePokemonComponent,
	],
	templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {

	private readonly service = inject(PokemonService);
	public detailPokemon: DetailPokemon = {} as DetailPokemon;
	public urlImage: string = '';


	async ngOnInit(): Promise<void> {
		this.detailPokemon = await this.service.getdataPokemonDetail('1');
		this.urlImage = `${environment.URL_IMAGE_OFFICIAL}/${this.detailPokemon.id}.png`;

	}

	public get types(): string {
		if (this.detailPokemon.hasOwnProperty('types')) {
			return this.detailPokemon.types.map(item => item.type.name).join(', ');
		}

		return '';
	}


	public get sprites(): string[] {
		if (this.detailPokemon.hasOwnProperty('sprites')) {
			return Object.values(this.detailPokemon.sprites).filter((item: any) => item !== null && typeof item === 'string');
		}

		return [];
	}

	public get moves(): string {
		if (this.detailPokemon.hasOwnProperty('moves')) {
			return this.detailPokemon.moves.map(item => item.move.name).slice(0, 5).join(', ');
		}

		return '';
	}

}
