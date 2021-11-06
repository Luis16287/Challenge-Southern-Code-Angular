import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { photoData } from 'src/app/Models/api-response';

@Component({
    selector: 'image-dialog',
    templateUrl: 'image-dialog.component.html',
    styleUrls: ['image-dialog.component.scss']
})
export class ImageDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ImageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: photoData
        ) { }
}
