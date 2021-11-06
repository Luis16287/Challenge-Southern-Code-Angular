import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { RouterModule, Routes } from '@angular/router';
import { Error500Component } from './routes/errors/error500/error500.component';
import { Error401Component } from './routes/errors/error401/error401.component';
import { Error404Component } from './routes/errors/error404/error404.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from './shared/components/block-template/block-template.component';

const appRoutes: Routes = [
  {
      path: 'app',
      loadChildren: './routes/routes.module#RoutesModule'
  },
  {
      path: '**',
      redirectTo: 'app/gallery'
  },
  { path: '500', component: Error500Component },
  { path: '401', component: Error401Component },
  { path: '404', component: Error404Component }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent,
      delayStop: 1000
    }),
  ],
  entryComponents: [AppComponent, BlockTemplateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
