import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataParams } from '@interfaces/pokemon.interface';
import { Store } from '@ngxs/store';
import { SearchPokemonAction, SelectPokemonBooleanAction } from '@store/selectPokemon/select-pokemon.actions';

@Component({
	selector: 'pn-search',
	imports: [
		ReactiveFormsModule,
		CommonModule
	],
	templateUrl: './search.component.html'
})
export class SearchComponent {
	private readonly formBuilder = inject(FormBuilder);
	private readonly router = inject(Router);
	private readonly store = inject(Store);
	private readonly route = inject(ActivatedRoute);
	
	public form!: FormGroup;
	private readonly params: DataParams = {} as DataParams;

	ngOnInit(): void {
		this.createForm();
		this.getParamsUrl();
		
	}

	private async getParamsUrl() {
		this.route.queryParams.subscribe(async (params: any) => {
			if (params.pokemon) {
				this.form.patchValue({ pokemon: params.pokemon });
				this.submit();
			}
		});
	}

	private createForm(): void {
		this.form = this.formBuilder.group({
			pokemon: ['', [Validators.required]],
		});
	}

	public submit(): void {
		this.store.dispatch(new SearchPokemonAction(''));
		if (this.form.valid) {
			this.params['pokemon'] = this.form.value.pokemon;
			this.router.navigate(['.'], {
				queryParams: this.params
			})
			this.store.dispatch(new SearchPokemonAction(this.form.value.pokemon));
			this.store.dispatch(new SelectPokemonBooleanAction(true));
		} else {
			this.form.markAllAsTouched();
		}
	}
}
