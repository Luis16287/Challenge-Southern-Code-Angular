import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, photoData } from '../Models/api-response';
import * as moment from "moment";
import { map } from "rxjs/operators";
import { Manifest } from '../Models/manifest-response';

@Injectable({
    providedIn: 'root',
})

export class NasaService {
    constructor(
        protected http: HttpClient,
    ) { }

    getMarsRoverPhotos(roverName: string, page: number, selectedCam, earthDate?: Date, solDate?: string): Observable<ApiResponse> {
        const pageQuery = `&page=${page}`;
        let earthDateQuery = '';
        if (earthDate) {
            const userDate = moment(new Date(earthDate)).format("yyyy-MM-d");
            earthDateQuery = `earth_date=${userDate}`
        } else {
            const currentDate = moment(new Date()).format("yyyy-MM-d");
            earthDateQuery = `earth_date=${currentDate}`
        }

        let solDateQuery = '';
        if (solDate) {
            solDateQuery = `sol=${solDate}`;
        }
        return this.http.get<ApiResponse>(`${environment.baseUrl}/rovers/${roverName}/photos?${earthDateQuery}${solDateQuery}&api_key=${environment.apiKey}${pageQuery}`)
            .pipe(map((res) => ({
                photos: res.photos,
                lastPageLoaded: page,
                hasMorePhotos: res.photos.length > 0,
                selectedCam
            })));
    }

    getMissionManifest(roverName: string): Observable<Manifest> {
        return this.http.get<Manifest>(`${environment.baseUrl}/manifests/${roverName}?api_key=${environment.apiKey}`)
            .pipe(map((res) => res));
    }
}