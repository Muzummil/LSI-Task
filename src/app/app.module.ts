import { ThemeService } from "src/app/shared/services/theme.service";
import { FormsModule } from "@angular/forms";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ErrorService } from "./shared/services/error.service";
import { HelperService } from "./shared/services/helper.service";

function initializeApp(themeService: ThemeService) {
  return () => themeService.switchTheme("md-light-indigo");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    ErrorService,
    HelperService,
    {
      provide: APP_INITIALIZER,
      deps: [ThemeService],
      useFactory: initializeApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
