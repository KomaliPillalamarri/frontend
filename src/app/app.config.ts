import { ApplicationConfig, provideEnvironmentInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { CalendarFeatureModule } from './app.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync(),
     provideEnvironmentInitializer(provideToastr),
     provideToastr(),
     provideHttpClient(),
     provideRouter([
      {path: 'admin/events/calendar/view',loadChildren: () => CalendarFeatureModule},
     ]),
     
    ]
  
};
