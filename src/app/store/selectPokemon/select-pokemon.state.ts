import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SelectPokemonBooleanAction, SelectPokemonIdAction } from './select-pokemon.actions';

export type changeSelectPokemon = {
	select: boolean,
	idPokemon: string
}

const defaultsChangeSelectPokemon = {} as changeSelectPokemon;

const defaults: changeSelectPokemon = {
	select: false,
	idPokemon: ''
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
}
