export class Manifest {
    photo_manifest: ManifestData
}

export class ManifestData {
    landing_date: string
    launch_date: string
    max_date: string
    max_sol: number
    name: string
    photos: ManifestPhoto[]
    status: string
    total_photos: number
}

export class ManifestPhoto {
    cameras: string[]
    earth_date: string
    sol: number
    total_photos: number
}

export enum FILTEROPTIONS {
    TODAS = 'Todas'
}