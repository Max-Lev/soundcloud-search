
export interface ITrackSearchUserViewModel {
    userName: string;
    title: string;
    userID: number;
};
/**
 * @class track search view model
 */
export class TrackSearchUserViewModel implements ITrackSearchUserViewModel {
    userName: string;
    title: string;
    userID: number;
    constructor(user: any, trackTitle: string) {
        this.title = trackTitle;
        this.userName = user['username'];
        this.userID = user['id'];
    };
};