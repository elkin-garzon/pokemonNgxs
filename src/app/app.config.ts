import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ROUTER_POKEMON } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(ROUTER_POKEMON),
		importProvidersFrom(
			NgxsModule.forRoot([]),
		),
		provideHttpClient(
			withFetch(),
			withInterceptors([])
		),
	]
};
