import { Injectable } from '@angular/core';
import * as SC from 'soundcloud';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { ISoundCloudTrackResponse } from '../models/sound-cloud-track.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private page_size = 5;
  sc: SC = SC;

  constructor(private http: HttpClient) {

    this.sc.initialize({
      client_id: environment.soundCloud_UerID,
      redirect_uri: environment.soundCloud_RedirectURL
    });

  };

  search(searchParam: string): Promise<any> {

    let promise = new Promise((resolve, reject) => {
      resolve(this.sc.get('tracks', { q: searchParam, limit: this.page_size, linked_partitioning: 1 }).then((tracks: ISoundCloudTrackResponse) => {
        console.log('tracks.collection: ' + tracks.collection);
        return tracks;
      }));
    }).then((data) => {
      return data;
    }).catch((err) => {
      throw new Error(err);
    });
    return promise;

  };
}
