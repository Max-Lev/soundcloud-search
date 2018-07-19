import { Injectable } from '@angular/core';
import * as SC from 'soundcloud';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ISoundCloudTrackResponse } from '../models/soundcloud-track-search-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  page_size = 5;

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
