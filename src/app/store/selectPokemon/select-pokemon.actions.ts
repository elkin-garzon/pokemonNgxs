export class SelectPokemonIdAction {
	static readonly type = '[SelectPokemon] Select Pokemon id';
	constructor(public payload: string) { }
}

export class SelectPokemonBooleanAction {
	static readonly type = '[SelectPokemon] Select Pokemon view';
	constructor(public payload: boolean) { }
}
