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
import { PinHeaderComponent } from './common/components/pin-header/pin-header.component';
import { InfiniteListComponent } from './common/components/infinite-list/infinite-list.component';
import { InfiniteItemComponent } from './common/components/infinite-list/infinite-item/infinite-item.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { UserEffects } from './store/effects/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProfileComponent } from './profile/profile.component';
import { FilePreviewOverlayComponent } from './common/components/overlay/file-preview-overlay/file-preview-overlay.component';
import {AuthGuard} from './common/guards/login-activate.guard';
import { SpinnerOverlayComponent } from './common/components/overlay/spinner-overlay/spinner-overlay.component';
import {MatProgressSpinnerModule} from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from './environments/environments';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PinHeaderComponent,
    InfiniteListComponent,
    InfiniteItemComponent,
    ProfileComponent,
    FilePreviewOverlayComponent,
    SpinnerOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
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
    StoreDevtoolsModule.instrument({maxAge: 10}),
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    FilePreviewOverlayComponent,
    SpinnerOverlayComponent
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
