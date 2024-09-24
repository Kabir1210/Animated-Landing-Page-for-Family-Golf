import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './util/tokenIntercenpter';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes)]
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptorsFromDi()), 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, provideAnimationsAsync(),{provide:LocationStrategy,useClass:HashLocationStrategy}],
};



