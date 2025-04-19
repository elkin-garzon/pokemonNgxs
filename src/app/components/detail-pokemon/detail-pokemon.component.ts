import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ImagePokemonComponent } from '@components/image-pokemon/image-pokemon.component';
import { environment } from '@environments/environment.development';
import { DetailPokemon, Sprites } from '@interfaces/pokemon.interface';
import { Store } from '@ngxs/store';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { SelectPokemonBooleanAction } from '@store/selectPokemon/select-pokemon.actions';
import { SelectPokemonState } from '@store/selectPokemon/select-pokemon.state';
import { map, Subscription } from 'rxjs';

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
	private store = inject(Store);
	public detailPokemon: DetailPokemon = {} as DetailPokemon;
	public urlImage: string = '';
	private subscriptions: Subscription[] = [];


	async ngOnInit(): Promise<void> {
		this.observerOrderList();
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(u => u.unsubscribe());
	}

	private observerOrderList() {
		this.subscriptions.push(
			this.store.select(SelectPokemonState.selectIdPokemon).pipe(map((id: string) => this.setPokemon(id))).subscribe(),
		);
	}

	private async setPokemon(id: string) {
		if (id !== '') {
			this.detailPokemon = await this.service.getdataPokemonDetail(id);
			this.urlImage = `${environment.URL_IMAGE_OFFICIAL}/${this.detailPokemon.id}.png`;
			return
		}
		this.detailPokemon = {} as DetailPokemon;
	}

	public get types(): string {
		if (this.detailPokemon.hasOwnProperty('types')) {
			return this.detailPokemon.types.map(item => item.type.name).join(', ');
		}

		return '';
	}


	public get sprites(): string[] {
		if (this.detailPokemon.hasOwnProperty('sprites')) {
			return Object.values(this.detailPokemon.sprites)
				.filter((item: any) => item !== null && typeof item === 'string')
				.slice(0, 4);
		}
		return [];
	}

	public get moves(): string {
		if (this.detailPokemon.hasOwnProperty('moves')) {
			return this.detailPokemon.moves.map(item => item.move.name).slice(0, 5).join(', ');
		}

		return '';
	}

	public closeDetailPokemon() {
		this.store.dispatch(new SelectPokemonBooleanAction(false));
	}

}
