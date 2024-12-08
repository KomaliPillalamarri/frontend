import { NgModule } from "@angular/core";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { AppComponent } from "./app.component";

@NgModule({
    imports: [
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ],
  })
  export class CalendarFeatureModule {}