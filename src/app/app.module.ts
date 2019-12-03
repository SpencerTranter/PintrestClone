import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { PinHeaderComponent } from './common/pin-header/pin-header.component';
import { InfiniteListComponent } from './common/infinite-list/infinite-list.component';
import { InfiniteItemComponent } from './common/infinite-list/infinite-item/infinite-item.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { StoreModule } from '@ngrx/store';
import {reducers, metaReducers} from './store/reducers';
import {UserEffects} from './store/effects/user.effect';
import {EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProfileComponent } from './profile/profile.component';
import { FilePreviewOverlayComponent } from './common/overlay/file-preview-overlay/file-preview-overlay.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PinHeaderComponent,
    InfiniteListComponent,
    InfiniteItemComponent,
    ProfileComponent,
    FilePreviewOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    OverlayModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({maxAge: 10})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    FilePreviewOverlayComponent
  ]
})
export class AppModule {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIcon(
      'pinterest',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/pinterest-icon.svg')
    );
  }


}
