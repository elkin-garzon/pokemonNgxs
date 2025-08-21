import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailPokemonComponent } from '@components/detail-pokemon/detail-pokemon.component';
import { PokemonComponent } from '@components/pokemon/pokemon.component';
import { SearchComponent } from '@components/search/search.component';
import { DataParams, ResultPokemns, SearchPokemon } from '@interfaces/pokemon.interface';
import { Store } from '@ngxs/store';
import { PokemonService } from '@services/pokemon/pokemon.service';
import { SelectPokemonIdAction } from '@store/selectPokemon/select-pokemon.actions';
import { SelectPokemonState } from '@store/selectPokemon/select-pokemon.state';
import { map, Subscription } from 'rxjs';

@Component({
	selector: 'pn-list-pokemon',
	imports: [
		CommonModule,
		PokemonComponent,
		DetailPokemonComponent,
		SearchComponent,
	],
	templateUrl: './list-pokemon.component.html'
})
export class ListPokemonComponent {

	private readonly service = inject(PokemonService);
	private readonly router = inject(Router);
	private readonly route = inject(ActivatedRoute);
	private store = inject(Store);
	private readonly params: DataParams = {} as DataParams;
	private subscriptions: Subscription[] = [];

	public dataPokemons: ResultPokemns = {} as ResultPokemns;
	public viewDetail: boolean = false;

	async ngAfterViewInit(): Promise<void> {
		this.getParamsUrl();
		this.observerOrderList();
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
		this.router.navigate(['/pokemon-ngxs'], {
			queryParams: this.params
		})
	}

	private observerOrderList() {
		this.subscriptions.push(
			this.store.select(SelectPokemonState.selectPokemon).pipe(map((view: boolean) => this.setViewPokemon(view))).subscribe(),
			this.store.select(SelectPokemonState.searchPokemon).pipe(map((search: string) => this.searchPokemon(search))).subscribe(),
		);
	}

	private async setViewPokemon(view: boolean) {
		this.viewDetail = view;
	}

	private async searchPokemon(search: string): Promise<void> {
		this.viewDetail = false;
		if (search !== '') {
			let data: SearchPokemon = await this.getDataSearchPokemon(search);
			this.store.dispatch(new SelectPokemonIdAction(String(data.id)));
			this.viewDetail = true;
		}
	}

	private async getDataSearchPokemon(search: string): Promise<SearchPokemon> {
		return await this.service.searchPokemon(search);
	}
}
