import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Filter } from '../Models/favourite';

@Injectable({
    providedIn: 'root',
})

export class StorageService {
    constructor() { }

    setFilter(rover: string, filters: Filter, filterData: any) {
        const savedFilter = this.getFilter(rover);
        const filter = {
            cam: filters['cam'],
            earthDate: filters['earthDate'],
            solDate: filters['solDate'],
            name: filterData['name'],
            observation: filterData['observation'],
            creationDate: filterData['date']
        };

        if (!savedFilter) {
            localStorage.setItem(
                rover,
                JSON.stringify([filter])
            );
        } else {
            savedFilter.push(filter);
            localStorage.setItem(
                rover,
                JSON.stringify(savedFilter)
            );
        }
    }

    getFilter(rover: string) {
        const filter = JSON.parse(localStorage.getItem(rover));
        return filter;
    }
}