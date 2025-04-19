import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { statusList } from './store';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		importProvidersFrom(
			NgxsModule.forRoot(statusList),
		),
		provideHttpClient(
			withFetch(),
			withInterceptors([])
		),
	]
};
