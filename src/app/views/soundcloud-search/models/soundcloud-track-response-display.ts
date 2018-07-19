
export interface ITrackDisplay {
    userName: string;
    title: string;
    userID: number;
};

export class TrackDisplay implements ITrackDisplay {
    userName: string;
    title: string;
    userID: number;
    constructor(user: any, trackTitle: string) {
        this.title = trackTitle;
        this.userName = user['username'];
        this.userID = user['id'];
    };
};