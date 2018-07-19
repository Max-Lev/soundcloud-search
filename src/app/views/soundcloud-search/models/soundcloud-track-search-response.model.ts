import { ITrackDisplay, TrackDisplay } from "./soundcloud-track-response-display";

export interface ISoundCloudTrackResponse {
    collection: ITrackCollection[];
    nextPagination: string;
};

export class SoundCloudTrackResponse implements ISoundCloudTrackResponse {
    collection: ITrackCollection[];
    nextPagination: string;
    displayData: TrackCollectionModel[];
    constructor(response: ISoundCloudTrackResponse) {
        this.collection = response.collection;
        this.nextPagination = response.nextPagination;
        this.setCollectionData(this.collection);
    };

    setCollectionData(collection: any[]) {
        this.displayData = collection.map(item => {
            return new TrackCollectionModel(item);
        });
    };

    getDisplayData() {
        return this.displayData;
    };
};

export interface ITrackCollection {
    trackID: number;
    title: string;
    user: ITrackDisplay;
};

export class TrackCollectionModel implements ITrackCollection {
    trackID: number;
    title: string;
    user: ITrackDisplay;
    constructor(data: any) {
        this.trackID = data.id;
        this.title = data.title;
        this.user = new TrackDisplay(data.user, this.title);
    };
};
