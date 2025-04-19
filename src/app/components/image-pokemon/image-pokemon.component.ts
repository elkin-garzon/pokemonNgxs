import { Component, Input } from '@angular/core';

@Component({
	selector: 'pn-image-pokemon',
	imports: [],
	templateUrl: './image-pokemon.component.html'
})
export class ImagePokemonComponent {
	
	@Input() set url(data: string) {
		this._url = data;
	};
	public _url: string = '';

	@Input() set name(name: string) {
		this._name = name;
	};
	public _name: string = '';

}
