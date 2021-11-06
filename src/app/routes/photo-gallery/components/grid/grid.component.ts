import { animate, style } from '@angular/animations';
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { ApiResponse, photoData } from 'src/app/Models/api-response';
import { ROVERNAMES } from 'src/app/Models/rover-names';
import { ImageDialogComponent } from 'src/app/shared/components/image-dialog/image-dialog.component';

@Component({
    selector: 'grid',
    templateUrl: 'grid.component.html',
    styleUrls: ['grid.component.scss']
})
export class GridComponent {
    public masonryOptions: NgxMasonryOptions = {
        gutter: 25,
        fitWidth: true,
        animations: {
            show: [
                style({ opacity: 0 }),
                animate('400ms ease-in', style({ opacity: 1 })),
            ],
            hide: [
                style({ opacity: '*' }),
                animate('400ms ease-in', style({ opacity: 0 })),
            ]
        },
        horizontalOrder: true,
        resize: true,
        percentPosition: true
    };
    @Input() data: ApiResponse;
    @Input() roverType: string;
    @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
    @Output() loadMore: EventEmitter<{ type: string, lastPage: number }> = new EventEmitter();
    @Output() loadedItems: EventEmitter<string> = new EventEmitter();

    constructor(private dialog: MatDialog) {}

    showMoreImages() {
        let type = '';
        switch (this.roverType) {
            case ROVERNAMES.CURIOSITY:
                type = ROVERNAMES.CURIOSITY;
                break;
            case ROVERNAMES.OPPORTUNITY:
                type = ROVERNAMES.OPPORTUNITY;
                break;
            case ROVERNAMES.PERSEVERANCE:
                type = ROVERNAMES.PERSEVERANCE;
                break;
            case ROVERNAMES.SPIRIT:
                type = ROVERNAMES.SPIRIT;
                break;
        }
        this.loadMore.emit({ type: this.roverType, lastPage: this.data.lastPageLoaded });
    }

    itemsLoaded() {
        this.loadedItems.emit(this.roverType);
    }

    openPhoto(img: photoData) {
        const dialogRef = this.dialog.open(ImageDialogComponent, {
            width: '70%',
            disableClose: true,
            data: img
        });
    }
}
