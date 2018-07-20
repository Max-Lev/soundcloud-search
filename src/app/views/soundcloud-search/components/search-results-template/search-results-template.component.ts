import { Component, OnInit, Input, OnChanges, ViewEncapsulation, OnDestroy } from '@angular/core';
import { TrackViewModelCollection } from '../../models/soundcloud-track-search-response.model';

@Component({
  selector: 'app-search-results-template',
  templateUrl: './search-results-template.component.html',
  styleUrls: ['./search-results-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsTemplateComponent implements OnInit, OnChanges, OnDestroy {

  @Input() trackList: TrackViewModelCollection[] = [];

  constructor() { };

  ngOnInit() { };

  ngOnChanges() { };

  ngOnDestroy(): void { };

  selected(item: TrackViewModelCollection) { console.log(item) };

}
