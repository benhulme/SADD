import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';

import { AppGlobals } from './globals';
import { DownloadService } from './downloadables.service';
import { MasonryModule } from 'angular2-masonry';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { GtagModule } from 'angular-gtag';

const ROUTES: Routes = [{ path: '', component: AppComponent }];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MasonryModule,
    Ng2PageScrollModule,
    GtagModule.forRoot({ trackingId: 'UA-119462418-1', trackPageviews: true }),
  ],
  providers: [DownloadService, AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule { }
