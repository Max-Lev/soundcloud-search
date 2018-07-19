import { Component, OnInit, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { TrackCollectionModel } from '../../models/soundcloud-track-search-response.model';

@Component({
  selector: 'app-search-results-template',
  templateUrl: './search-results-template.component.html',
  styleUrls: ['./search-results-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsTemplateComponent implements OnInit, OnChanges {

  @Input() trackList: any[] = [];

  constructor() {

  };

  ngOnInit() {
    this.trackList;
    debugger;
  };

  ngOnChanges() {

    console.log(this.trackList)
    debugger;
  };

  selected(item: any) {
    console.log(item)
  };

}
