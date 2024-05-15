import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/inteceptors/http.interceptor';
import { errorInterceptor } from './shared/inteceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()),provideHttpClient(withFetch(),withInterceptors([httpInterceptor,errorInterceptor]))]
};
