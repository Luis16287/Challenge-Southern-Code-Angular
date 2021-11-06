import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhotoGalleryModule } from './photo-gallery/photo-gallery.module';

@NgModule({
  imports: [
      PhotoGalleryModule,
  ],
  declarations: []
})
export class RoutesModule {
  constructor() {}
}
