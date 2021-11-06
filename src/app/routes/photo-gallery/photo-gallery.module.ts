// Angular Imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';
import { NasaService } from 'src/app/Services/nasa.service';
import { GridComponent } from './components/grid/grid.component';
import { MatButtonModule } from "@angular/material/button";

// This Module's Components
import { PhotoGalleryComponent } from './photo-gallery.component';
import { AppAccordionComponent } from 'src/app/shared/components/app-accordion/app-accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { BlockUIModule } from 'ng-block-ui';
import { ImageDialogComponent } from 'src/app/shared/components/image-dialog/image-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FavouriteDialogComponent } from 'src/app/shared/components/favourite-dialog/favourite-dialog.component';
import { StorageService } from 'src/app/Services/storage.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes = [
    {
        path: 'gallery',
        component: PhotoGalleryComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxMasonryModule,
        MatButtonModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatToolbarModule,
        MatSelectModule,
        MatCardModule,
        MatMenuModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        BlockUIModule, // Include without forRoot since it is a sub module
        FlexLayoutModule
    ],
    providers: [
        NasaService,
        StorageService,
        MatNativeDateModule,
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
    ],
    declarations: [
        PhotoGalleryComponent,
        GridComponent,
        AppAccordionComponent,
        ImageDialogComponent,
        FavouriteDialogComponent
    ],
    exports: [
        PhotoGalleryComponent,
    ],
    entryComponents: [ImageDialogComponent, FavouriteDialogComponent]
})
export class PhotoGalleryModule {

}
