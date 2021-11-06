import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filter } from 'src/app/Models/favourite';
import { StorageService } from 'src/app/Services/storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface DialogData {
    filter: Filter,
    rover: string
}

@Component({
    selector: 'favourite-dialog',
    templateUrl: 'favourite-dialog.component.html',
    styleUrls: ['favourite-dialog.component.scss']
})
export class FavouriteDialogComponent implements OnInit {
    public favouriteForm: FormGroup;
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(
        public dialogRef: MatDialogRef<FavouriteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.createDialogForm();
    }

    private createDialogForm() {
        this.favouriteForm = this.formBuilder.group({
            name: ["", [Validators.required]],
            observation: [""],
            date: [new Date()]
        });
    }

    public saveFovourite(): void {
        this.storageService.setFilter(this.data.rover, this.data.filter, this.favouriteForm.value);
        setTimeout(() => {
            this.openSnackBar('Filtro agregado a favoritos');
            this.closeDialog();
        }, 500);
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    private openSnackBar(message) {
        this._snackBar.open(message, null, {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2000
        });
      }
}
