import {
  Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild, ViewContainerRef,
  AfterViewInit,
  ComponentFactoryResolver,
  Inject
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ISoundCloudTrackResponse, ITrackCollection, SoundCloudTrackResponse, TrackCollectionModel } from '../../models/soundcloud-track-search-response.model';
import { SearchResultsTemplateComponent } from '../search-results-template/search-results-template.component';
import { EmptySearchTemplateComponent } from '../empty-search-template/empty-search-template.component';

@Component({
  selector: 'app-soundcloud-search-container',
  templateUrl: './soundcloud-search-container.component.html',
  styleUrls: ['./soundcloud-search-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [
    SearchResultsTemplateComponent,
    EmptySearchTemplateComponent
  ]
})
export class SoundcloudSearchContainerComponent implements OnInit, AfterViewInit {

  searchForm: FormGroup;

  response: TrackCollectionModel[];

  @ViewChild('resultsTemp', { read: ViewContainerRef }) templateContainer: ViewContainerRef;

  // @Inject(ComponentFactoryResolver) resolver
  constructor(private formBuilder: FormBuilder, private searchService: SearchService,
    private resolver: ComponentFactoryResolver, private ref: ChangeDetectorRef) {
    this.resolver = resolver;
    this.searchFormBuilder();
  };

  ngOnInit() { };

  ngAfterViewInit(): void { };

  onSubmit() {
    if (this.searchForm.valid) {
      const searchParam = this.searchForm.controls['searchInput'].value;
      this.searchService.search(searchParam).then((tracksResponse: ISoundCloudTrackResponse) => {

        this.response = this.setCollectionModel(tracksResponse);
        (this.response.length > 0) ? this.createResultsComponent(this.response) : this.createEmptyResultsComponent();

        this.ref.markForCheck();
        return tracksResponse;
      });
    }
  };

  setCollectionModel(response: ISoundCloudTrackResponse): TrackCollectionModel[] {
    const model = new SoundCloudTrackResponse(response);
    return model.getDisplayData();
  };

  createResultsComponent(data: any) {
    this.templateContainer.clear();
    const factory = this.resolver.resolveComponentFactory(SearchResultsTemplateComponent);
    factory.create(this.templateContainer.injector);
    const dynamicComponentRef = this.templateContainer.createComponent(factory);
    dynamicComponentRef.instance.trackList = [data];
    this.ref.detectChanges();
  };

  createEmptyResultsComponent() {
    this.templateContainer.clear();
    const factory = this.resolver.resolveComponentFactory(EmptySearchTemplateComponent);
    const dynamicComponentRef = this.templateContainer.createComponent(factory);
    dynamicComponentRef.instance.title = 'No Results Found';
    this.ref.detectChanges();
  }

  searchFormBuilder() {
    this.searchForm = this.formBuilder.group({
      searchInput: new FormControl('', Validators.required)
    });
  };

}
