import { Component, OnInit, Input, ContentChildren, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ApiResponse } from 'src/app/Models/api-response';
import { Favourite, Filter } from 'src/app/Models/favourite';
import { FILTEROPTIONS, Manifest } from 'src/app/Models/manifest-response';
import { StorageService } from 'src/app/Services/storage.service';
import { FavouriteDialogComponent } from '../favourite-dialog/favourite-dialog.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './app-accordion.component.html',
  styleUrls: ['./app-accordion.component.scss']
})
export class AppAccordionComponent implements OnInit, OnChanges {
  public accordionForm: FormGroup;
  public favourites: Array<Favourite>;
  public maxDate = new Date();
  @Input() isOpen = true;
  @Input() title;
  @Input() description;
  @Input() data: Manifest;
  camOptions: Array<string> = [FILTEROPTIONS.TODAS];
  @ContentChildren('body') body: Component;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Output() camSelected: EventEmitter<string> = new EventEmitter();
  @Output() onSearch: EventEmitter<{ filter: Filter, type: string }> = new EventEmitter();
  public disableSearch: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.createDialogForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setCamOptions();
    this.getFavourites();
  }

  private setCamOptions(): void {
    this.data?.photo_manifest.photos.forEach(p => {
      p.cameras.forEach(c => {
        if (!this.camOptions.includes(c)) {
          this.camOptions.push(c);
        }
      });
    });
  }

  private createDialogForm() {
    this.accordionForm = this.formBuilder.group({
      earthDate: [""],
      solDate: [""],
      cam: [null]
    });

    this.accordionForm.get('earthDate').valueChanges.subscribe(cam => {
      if (this.accordionForm.get('earthDate').dirty) {
        this.disableSearch = false;
        this.accordionForm.get('solDate').reset();
        this.accordionForm.get('earthDate').markAsUntouched();
      }
    });

    this.accordionForm.get('solDate').valueChanges.subscribe(cam => {
      if (this.accordionForm.get('solDate').dirty) {
        this.disableSearch = false;
        this.accordionForm.get('earthDate').reset();
        this.accordionForm.get('solDate').markAsUntouched();
      }
    });

    this.accordionForm.get('cam').valueChanges.subscribe(cam => {
      this.camSelected.emit(cam);
    });
  }

  public search() {
    this.onSearch.emit({ filter: this.accordionForm.value, type: this.title });
  }

  public openFavouriteModal(): void {
    const dialogRef = this.dialog.open(FavouriteDialogComponent, {
      width: '40%',
      disableClose: true,
      data: { filter: this.accordionForm.value, rover: this.title }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getFavourites();
    });
  }

  public getFavourites(): void {
    const favourites = this.storageService.getFilter(this.title);
    if (favourites) {
      this.favourites = favourites;
    }
  }

  public filterByFavourite(f: Favourite): void {
    const solDate = this.accordionForm.get('solDate');
    const earthDate = this.accordionForm.get('earthDate');
    const cam = this.accordionForm.get('cam');

    this.accordionForm.reset();
    this.accordionForm.markAsUntouched();

    if (f.solDate) {
      earthDate.reset();
      solDate.setValue(f.solDate)
      solDate.markAsUntouched();
    }

    if (f.earthDate) {
      solDate.reset();
      earthDate.setValue(f.earthDate)
      earthDate.markAsUntouched();
    }

    if (f.cam) {
      cam.setValue(f.cam)
      cam.markAsUntouched();
    }

    this.search();
  }
}
