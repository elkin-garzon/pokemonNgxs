import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataParams } from '@interfaces/pokemon.interface';

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
	public form!: FormGroup;
	private readonly params: DataParams = {} as DataParams;

	ngOnInit(): void {
		this.createForm();
	}

	private createForm(): void {
		this.form = this.formBuilder.group({
			pokemon: ['', [Validators.required]],
		});
	}

	public submit(): void {
		if (this.form.valid) {
			this.params['pokemon'] = this.form.value.pokemon;
			this.router.navigate(['.'], {
				queryParams: this.params
			})
		} else {
			this.form.markAllAsTouched();
		}
	}
}
