import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
	providedIn: 'root'
})
export class BaseService {

	public readonly url_base: string = environment.URL_API;
	public readonly http = inject(HttpClient);
}
