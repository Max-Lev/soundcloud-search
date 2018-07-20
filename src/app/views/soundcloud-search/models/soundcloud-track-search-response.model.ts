import { ITrackSearchUserViewModel, TrackSearchUserViewModel } from "./soundcloud-track-response-display";

export interface ISoundCloudTrackResponse {
    collection: ITrackViewModelCollection[];
    next_href: string;
};
/**
 * @class search response main model
 */
export class SoundCloudTrackResponse implements ISoundCloudTrackResponse {
    collection: ITrackViewModelCollection[];
    next_href: string;
    displayData: TrackViewModelCollection[];
    constructor(response: ISoundCloudTrackResponse) {
        this.collection = response.collection;
        this.next_href = response.next_href;
        this.setCollectionData(this.collection);
    };

    setCollectionData(collection: any[]) {
        this.displayData = collection.map(item => {
            return new TrackViewModelCollection(item);
        });
    };

    getDisplayData() {
        return this.displayData;
    };
};

export interface ITrackViewModelCollection {
    trackID: number;
    title: string;
    user: ITrackSearchUserViewModel;
};

export class TrackViewModelCollection implements ITrackViewModelCollection {
    trackID: number;
    title: string;
    user: ITrackSearchUserViewModel;
    constructor(data: any) {
        this.trackID = data.id;
        this.title = data.title;
        this.user = new TrackSearchUserViewModel(data.user, this.title);
    };
};
