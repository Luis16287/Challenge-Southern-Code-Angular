export class ApiResponse {
    photos: photoData[];
    lastPageLoaded: number;
    hasMorePhotos: boolean;
    selectedCam: string;
}

export class photoData {
    id: number;
    sol: number;
    camera: cameraData;
    img_src: string;
    earth_date: string;
    rover: roverData;
}

export class cameraData {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
}

export class roverData {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
}