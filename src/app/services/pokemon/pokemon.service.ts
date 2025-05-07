import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color, DataParams, DetailPokemon, ResultPokemns, SearchPokemon, Specie } from '@interfaces/pokemon.interface';
import { BaseService } from '@services/base/base.service';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PokemonService extends BaseService {

	constructor() {
		super();
	}

	public getdataPokemon(data: DataParams): Promise<ResultPokemns> {
		return new Promise((resolve, reject) => {
			if (!data.hasOwnProperty('offset')) {
				data['offset'] = '0';
			}
			if (!data.hasOwnProperty('limit')) {
				data['limit'] = '4';
			}

			let params = new HttpParams();
			params = params.appendAll(data);

			let subscription: Subscription;
			subscription = this.http.get<ResultPokemns>(`${this.url_base}/pokemon`, { params }).subscribe({
				next: (result: ResultPokemns) => {
					resolve(result);
				},
				error: (error: any) => {
					reject(error);
				},
				complete: () => {
					if (subscription) {
						subscription.unsubscribe();
					}
				}
			})
		});
	}


	public getdataPokemonDetail(id: string): Promise<DetailPokemon> {
		return new Promise((resolve, reject) => {

			let subscription: Subscription;
			subscription = this.http.get<DetailPokemon>(`${this.url_base}/pokemon/${id}`).subscribe({
				next: (result: DetailPokemon) => {
					resolve(result);
				},
				error: (error: any) => {
					reject(error);
				},
				complete: () => {
					if (subscription) {
						subscription.unsubscribe();
					}
				}
			})
		});
	}

	public getdataPokemonDetailSpecies(id: string): Promise<Color> {
		return new Promise((resolve, reject) => {
			let subscription: Subscription;
			subscription = this.http.get<Specie>(`${this.url_base}/pokemon-species/${id}`).subscribe({
				next: (result: Specie) => {
					resolve(result.color);
				},
				error: (error: any) => {
					reject(error);
				},
				complete: () => {
					if (subscription) {
						subscription.unsubscribe();
					}
				}
			})
		});
	}

	public searchPokemon(name: string): Promise<SearchPokemon> {
		return new Promise((resolve, reject) => {
			let subscription: Subscription;
			subscription = this.http.get<SearchPokemon>(`${this.url_base}/pokemon/${name}`).subscribe({
				next: (result: SearchPokemon) => {
					resolve(result);
				},
				error: (error: any) => {
					reject(error);
				},
				complete: () => {
					if (subscription) {
						subscription.unsubscribe();
					}
				}
			})
		});
	}

}
