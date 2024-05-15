import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/inteceptors/http.interceptor';
import { errorInterceptor } from './shared/inteceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch(),withInterceptors([httpInterceptor,errorInterceptor]))]
};
