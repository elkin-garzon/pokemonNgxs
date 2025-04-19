import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataParams, DetailPokemon, ResultPokemns } from '@interfaces/pokemon.interface';
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
			subscription = this.http.get<ResultPokemns>(`${this.url_base}`, { params }).subscribe({
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
			subscription = this.http.get<DetailPokemon>(`${this.url_base}/${id}`).subscribe({
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
}
