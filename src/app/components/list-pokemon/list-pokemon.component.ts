import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailPokemonComponent } from '@components/detail-pokemon/detail-pokemon.component';
import { PokemonComponent } from '@components/pokemon/pokemon.component';
import { DataParams, ResultPokemns } from '@interfaces/pokemon.interface';
import { PokemonService } from '@services/pokemon/pokemon.service';

@Component({
	selector: 'pn-list-pokemon',
	imports: [
		PokemonComponent,
		DetailPokemonComponent
	],
	templateUrl: './list-pokemon.component.html'
})
export class ListPokemonComponent {

	private readonly service = inject(PokemonService);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	private readonly params: DataParams = {} as DataParams;

	public dataPokemons: ResultPokemns = {} as ResultPokemns;

	async ngOnInit(): Promise<void> {
		this.getParamsUrl();
	}

	private async getParamsUrl() {
		this.route.queryParams.subscribe(async (params: any) => {
			Object.assign(this.params, params);
			this.dataPokemons = await this.listData();
		});
	}



	private async listData(): Promise<ResultPokemns> {
		return await this.service.getdataPokemon(this.params);
	}

	public async loadNewData(url: string) {
		if (url !== null) {
			this.createParamsUrl(url);
			this.dataPokemons = await this.listData();
		}
	}


	private createParamsUrl(url: string): any {
		url.split('?')[1].split('&').forEach((param: string) => {
			const [key, value] = param.split('=');
			this.params[key] = value;
		});
		this.router.navigate(['.'], {
			queryParams: this.params
		})
	}
}
