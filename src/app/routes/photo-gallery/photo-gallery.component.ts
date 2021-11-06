import { Component, OnInit } from '@angular/core';
import { ROVERNAMES } from 'src/app/Models/rover-names';
import { NasaService } from 'src/app/Services/nasa.service';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';
import { ApiResponse, photoData } from 'src/app/Models/api-response';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FILTEROPTIONS, Manifest } from 'src/app/Models/manifest-response';
import { Filter } from 'src/app/Models/favourite';

@Component({
    selector: 'photo-gallery',
    templateUrl: 'photo-gallery.component.html',
    styleUrls: ['photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    @BlockUI('curiosity-grid') curiosityBlockUI: NgBlockUI;
    @BlockUI('oportunity-grid') opotunityBlockUI: NgBlockUI;
    @BlockUI('perseverance-grid') perseveranceBlockUI: NgBlockUI;
    @BlockUI('spirit-grid') spiritBlockUI: NgBlockUI;

    public roverNames = ROVERNAMES;
    public curiosityData: ApiResponse;
    public opportunityData: ApiResponse;
    public perseveranceData: ApiResponse;
    public spiritData: ApiResponse;

    public filteredCuriosityData: ApiResponse;
    public filteredOpportunityData: ApiResponse;
    public filteredPerseveranceData: ApiResponse;
    public filteredSpiritData: ApiResponse;

    public curiosityManifest: Manifest;
    public opportunityManifest: Manifest;
    public perseveranceManifest: Manifest;
    public spiritManifest: Manifest;

    constructor(
        private nasaService: NasaService
    ) {
        this.getMissionManifest();
    }

    ngOnInit(): void {
        this.getPhotos();
    }

    private getPhotos(): void {
        this.blockUI.start('Cargando...');
        zip(
            this.nasaService.getMarsRoverPhotos(this.roverNames.CURIOSITY.toLocaleLowerCase(), 1, FILTEROPTIONS.TODAS, new Date(2015, 6, 3)),
            this.nasaService.getMarsRoverPhotos(this.roverNames.OPPORTUNITY.toLocaleLowerCase(), 1, FILTEROPTIONS.TODAS, new Date(2015, 6, 3)),
            this.nasaService.getMarsRoverPhotos(this.roverNames.PERSEVERANCE.toLocaleLowerCase(), 1, FILTEROPTIONS.TODAS, new Date(2015, 6, 3)),
            this.nasaService.getMarsRoverPhotos(this.roverNames.SPIRIT.toLocaleLowerCase(), 1, FILTEROPTIONS.TODAS, new Date(2015, 6, 3))
        )
            .pipe(
                map((res) => {
                    return {
                        curiosity: res[0],
                        opportunity: res[1],
                        perseverance: res[2],
                        spirit: res[3]
                    };
                })
            )
            .subscribe((res) => {
                this.curiosityData = res.curiosity;
                this.opportunityData = res.opportunity;
                this.perseveranceData = res.perseverance;
                this.spiritData = res.spirit;
                this.filteredCuriosityData = this.curiosityData;
                this.filteredOpportunityData = this.opportunityData;
                this.filteredPerseveranceData = this.perseveranceData;
                this.filteredSpiritData = this.spiritData;
                this.blockUI.stop();
            });
    }

    public loadedItems(evt): void {
        console.log('loadedItems > evt > ', evt);
    }

    public loadMore(evt: { type: string, lastPage: number }): void {
        this.blockGrid(evt.type, true);
        const cam = this.getSelectedCam(evt.type);
        this.nasaService.getMarsRoverPhotos(evt.type.toLocaleLowerCase(), evt.lastPage + 1, cam, new Date(2015, 6, 3)).subscribe(res => {
            switch (evt.type) {
                case ROVERNAMES.CURIOSITY:
                    this.curiosityData.photos = [...this.curiosityData.photos, ...res.photos];
                    this.curiosityData.lastPageLoaded = res.lastPageLoaded;
                    this.curiosityData.hasMorePhotos = res.hasMorePhotos;
                    this.filteredCuriosityData = this.curiosityData;
                    break;
                case ROVERNAMES.OPPORTUNITY:
                    this.opportunityData.photos = [...this.opportunityData.photos, ...res.photos];
                    this.opportunityData.lastPageLoaded = res.lastPageLoaded;
                    this.opportunityData.hasMorePhotos = res.hasMorePhotos;
                    this.filteredOpportunityData = this.opportunityData;
                    break;
                case ROVERNAMES.PERSEVERANCE:
                    this.perseveranceData.photos = [...this.perseveranceData.photos, ...res.photos];
                    this.perseveranceData.lastPageLoaded = res.lastPageLoaded;
                    this.perseveranceData.hasMorePhotos = res.hasMorePhotos;
                    this.filteredPerseveranceData = this.perseveranceData;
                    break;
                case ROVERNAMES.SPIRIT:
                    this.spiritData.photos = [...this.spiritData.photos, ...res.photos];
                    this.spiritData.lastPageLoaded = res.lastPageLoaded;
                    this.spiritData.hasMorePhotos = res.hasMorePhotos;
                    this.filteredSpiritData = this.spiritData;
                    break;
            }
            this.camFilter(cam, evt.type);
            this.blockGrid(evt.type, false);
        }, error => {
            console.error('Error obteniendo más fotos. Detalle: ' + JSON.stringify(error, null, 2));
        })
    }

    private getSelectedCam(type: string): string {
        let cam = FILTEROPTIONS.TODAS.toString();
        switch (type) {
            case ROVERNAMES.CURIOSITY:
                cam = this.curiosityData.selectedCam;
                break;
            case ROVERNAMES.OPPORTUNITY:
                cam = this.opportunityData.selectedCam;
                break;
            case ROVERNAMES.PERSEVERANCE:
                cam = this.perseveranceData.selectedCam;
                break;
            case ROVERNAMES.SPIRIT:
                cam = this.spiritData.selectedCam;
                break;
        }
        return cam;
    }

    private blockGrid(type: string, block: boolean): void {
        switch (type) {
            case ROVERNAMES.CURIOSITY:
                if (block) {
                    this.curiosityBlockUI.start(`Buscando fotos para ${type}`);
                } else {
                    this.curiosityBlockUI.stop();
                }
                break;
            case ROVERNAMES.OPPORTUNITY:
                if (block) {
                    this.opotunityBlockUI.start(`Buscando fotos para ${type}`);
                } else {
                    this.opotunityBlockUI.stop();
                }
                break;
            case ROVERNAMES.PERSEVERANCE:
                if (block) {
                    this.perseveranceBlockUI.start(`Buscando fotos para ${type}`);
                } else {
                    this.perseveranceBlockUI.stop();
                }
                break;
            case ROVERNAMES.SPIRIT:
                if (block) {
                    this.spiritBlockUI.start(`Buscando fotos para ${type}`);
                } else {
                    this.spiritBlockUI.stop();
                }
                break;
            default: this.blockUI.stop();
                break;
        }
    }

    public camFilter(cam: string, roverType: string): void {
        cam = cam ?? this.getSelectedCam(roverType);
        switch (roverType) {
            case ROVERNAMES.CURIOSITY:
                const fCuriosity = this.curiosityData.photos.filter(p => p.camera.name.toLocaleLowerCase() == cam.toLocaleLowerCase());
                this.filteredCuriosityData.photos = cam.toString() != FILTEROPTIONS.TODAS.toString() ? (fCuriosity ?? []) : this.curiosityData.photos;
                break;
            case ROVERNAMES.OPPORTUNITY:
                const fOpportunity = this.opportunityData.photos.filter(p => p.camera.name.toLocaleLowerCase() == cam.toLocaleLowerCase());
                this.filteredOpportunityData.photos = cam.toString() != FILTEROPTIONS.TODAS.toString() ? (fOpportunity ?? []) :this.opportunityData.photos;
                break;
            case ROVERNAMES.PERSEVERANCE:
                const fPerseverance = this.perseveranceData.photos.filter(p => p.camera.name.toLocaleLowerCase() == cam.toLocaleLowerCase());
                this.filteredPerseveranceData.photos = cam.toString() != FILTEROPTIONS.TODAS.toString() ? (fPerseverance ?? []) : this.perseveranceData.photos;
                break;
            case ROVERNAMES.SPIRIT:
                const fSpirit = this.spiritData.photos.filter(p => p.camera.name.toLocaleLowerCase() == cam.toLocaleLowerCase());
                this.filteredSpiritData.photos = cam.toString() != FILTEROPTIONS.TODAS.toString() ? (fSpirit ?? []) : this.spiritData.photos;
                break;
        }
    }

    private getMissionManifest(): void {
        this.blockUI.start('Cargando manifesto de misión');
        zip(
            this.nasaService.getMissionManifest(this.roverNames.CURIOSITY.toLocaleLowerCase()),
            this.nasaService.getMissionManifest(this.roverNames.OPPORTUNITY.toLocaleLowerCase()),
            this.nasaService.getMissionManifest(this.roverNames.PERSEVERANCE.toLocaleLowerCase()),
            this.nasaService.getMissionManifest(this.roverNames.SPIRIT.toLocaleLowerCase())
        )
            .pipe(
                map((res) => {
                    return {
                        curiosity: res[0],
                        opportunity: res[1],
                        perseverance: res[2],
                        spirit: res[3]
                    };
                })
            )
            .subscribe((res) => {
                this.curiosityManifest = res.curiosity;
                this.opportunityManifest = res.opportunity;
                this.perseveranceManifest = res.perseverance;
                this.spiritManifest = res.spirit;
                this.blockUI.stop();
            });
    }

    public filter(params: { filter: Filter, type: string }): void {
        this.blockGrid(params.type, true);
        params.filter.cam = params.filter.cam ?? this.getSelectedCam(params.type);
        const earthDate = params.filter.earthDate ? new Date(params.filter.earthDate) : null;
        const solDate = params.filter.solDate ? params.filter.solDate : null;
        this.nasaService.getMarsRoverPhotos(params.type.toLocaleLowerCase(), 1, params.filter.cam, earthDate, solDate).subscribe(res => {
            switch (params.type) {
                case ROVERNAMES.CURIOSITY:
                    this.curiosityData.photos = [...this.curiosityData.photos, ...res.photos];
                    this.curiosityData.lastPageLoaded = res.lastPageLoaded;
                    this.curiosityData.hasMorePhotos = res.hasMorePhotos;
                    this.curiosityData.selectedCam = params.filter.cam;
                    this.filteredCuriosityData = this.curiosityData;
                    break;
                case ROVERNAMES.OPPORTUNITY:
                    this.opportunityData.photos = [...this.opportunityData.photos, ...res.photos];
                    this.opportunityData.lastPageLoaded = res.lastPageLoaded;
                    this.opportunityData.hasMorePhotos = res.hasMorePhotos;
                    this.opportunityData.selectedCam = params.filter.cam;
                    this.filteredOpportunityData = this.opportunityData;
                    break;
                case ROVERNAMES.PERSEVERANCE:
                    this.perseveranceData.photos = [...this.perseveranceData.photos, ...res.photos];
                    this.perseveranceData.lastPageLoaded = res.lastPageLoaded;
                    this.perseveranceData.hasMorePhotos = res.hasMorePhotos;
                    this.perseveranceData.selectedCam = params.filter.cam;
                    this.filteredPerseveranceData = this.perseveranceData;
                    break;
                case ROVERNAMES.SPIRIT:
                    this.spiritData.photos = [...this.spiritData.photos, ...res.photos];
                    this.spiritData.lastPageLoaded = res.lastPageLoaded;
                    this.spiritData.hasMorePhotos = res.hasMorePhotos;
                    this.spiritData.selectedCam = params.filter.cam;
                    this.filteredSpiritData = this.spiritData;
                    break;
            }
            this.camFilter(params.filter.cam, params.type);
            this.blockGrid(params.type, false);
        }, error => {
            console.error('Error obteniendo más fotos. Detalle: ' + JSON.stringify(error, null, 2));
        })
    }
}
