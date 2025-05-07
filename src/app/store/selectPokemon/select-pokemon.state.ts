import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SearchPokemonAction, SelectPokemonBooleanAction, SelectPokemonIdAction } from './select-pokemon.actions';

export type changeSelectPokemon = {
	select: boolean;
	idPokemon: string;
	search: string;
}

const defaults: changeSelectPokemon = {
	select: false,
	idPokemon: '',
	search: ''
};

@State<changeSelectPokemon>({
	name: 'selectPokemon',
	defaults
})
@Injectable()
export class SelectPokemonState {

	@Selector()
	static selectIdPokemon(state: changeSelectPokemon): string {
		return state.idPokemon
	}

	@Action(SelectPokemonIdAction)
	selectIdPokemon(ctx: StateContext<changeSelectPokemon>, { payload }: SelectPokemonIdAction) {
		ctx.patchState(
			{
				idPokemon: payload
			}
		);
	}

	@Selector()
	static selectPokemon(state: changeSelectPokemon): boolean {
		return state.select
	}

	@Action(SelectPokemonBooleanAction)
	selectPokemon(ctx: StateContext<changeSelectPokemon>, { payload }: SelectPokemonBooleanAction) {
		ctx.patchState(
			{
				select: payload
			}
		);
	}

	@Selector()
	static searchPokemon(state: changeSelectPokemon): string {
		return state.search
	}

	@Action(SearchPokemonAction)
	searchPokemon(ctx: StateContext<changeSelectPokemon>, { payload }: SearchPokemonAction) {
		ctx.patchState({ search: payload });
	}
}
