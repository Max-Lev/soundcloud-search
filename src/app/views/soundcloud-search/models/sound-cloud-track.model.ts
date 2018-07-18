export interface ISoundCloudTrackResponse {
    collection: any[];
    nextPagination: string;
};

export class SoundCloudTrackResponse implements ISoundCloudTrackResponse {
    collection: any[];
    nextPagination: string;
    constructor(response: ISoundCloudTrackResponse) {
        this.collection = response.collection;
        this.nextPagination = response.nextPagination;
    };
}