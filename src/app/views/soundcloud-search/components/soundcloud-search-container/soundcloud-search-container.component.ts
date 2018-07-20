import {
  Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ISoundCloudTrackResponse, SoundCloudTrackResponse, TrackViewModelCollection } from '../../models/soundcloud-track-search-response.model';
import { SearchResultsTemplateComponent } from '../search-results-template/search-results-template.component';
import { EmptySearchTemplateComponent } from '../empty-search-template/empty-search-template.component';
export const NO_RESULTS: string = 'No Results Found';
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

  nextDisabled: boolean = true;

  searchForm: FormGroup;
  /**
   * @prop dynamic component template container
   */
  @ViewChild('resultsTemp', { read: ViewContainerRef }) templateContainer: ViewContainerRef;
  /**
   * @prop search results list;
   */
  searchTracksResponse: SoundCloudTrackResponse;
  /**
   * @prop next page search flag
   */
  isNextPageRequest: boolean = false;
  /**
   * @prop next page search url
   */
  nextUrl: string;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService, private factoryResolver: ComponentFactoryResolver, private ref: ChangeDetectorRef) {
    this.factoryResolver = factoryResolver;
    this.searchFormBuilder();
  };

  ngOnInit() { };

  ngAfterViewInit(): void { };
  /**
   * @method search form submit
   */
  onSubmit() {
    if (this.searchForm.valid) {
      const searchParam = this.searchForm.controls['searchInput'].value;
      this.searchService.search(searchParam).then((tracksResponse: ISoundCloudTrackResponse) => {
        this.setDynamicComponentTemplate(tracksResponse);
        this.isNextPageRequest = true;
        this.ref.detectChanges();
        return tracksResponse;
      });
    }
  };
  /**
   * @method dynamic component template of search track results
   */
  setDynamicComponentTemplate(tracksResponse: ISoundCloudTrackResponse) {
    const viewModelData: TrackViewModelCollection[] = this.setViewModelData(tracksResponse);
    (viewModelData.length > 0) ? this.createSuccessResultsTemplate(viewModelData) : this.createEmptyResultsTemplate();
    this.isNextPagingBtnActive(this.searchTracksResponse.next_href);
    this.ref.detectChanges();
  };
  /**
   * @method convert view model data from search response
   */
  setViewModelData(response: ISoundCloudTrackResponse): TrackViewModelCollection[] {
    this.searchTracksResponse = new SoundCloudTrackResponse(response);
    return this.searchTracksResponse.getDisplayData();
  };
  /**
   * @method set is next paging btn active | disabled
   */
  isNextPagingBtnActive(isnextPagination: string): boolean {
    this.nextDisabled = (isnextPagination === undefined) ? true : false;
    return this.nextDisabled;
  };
  /**
   * @method get next search page
   */
  nextSearchPageAPI() {
    let url: string = (this.isNextPageRequest) ? this.searchTracksResponse.next_href : this.nextUrl;
    this.searchService.nextPage(url).subscribe((tracksResponse: ISoundCloudTrackResponse) => {
      this.isNextPageRequest = false;
      this.nextUrl = tracksResponse.next_href;
      this.setDynamicComponentTemplate(tracksResponse);
      return tracksResponse;
    });
  };
  /**
   * @method search results dynamic template container
   */
  createSuccessResultsTemplate(data: any) {
    this.templateContainer.clear();
    const factory = this.factoryResolver.resolveComponentFactory(SearchResultsTemplateComponent);
    factory.create(this.templateContainer.injector);
    const dynamicComponentRef = this.templateContainer.createComponent(factory);
    dynamicComponentRef.instance.trackList = [data];
  };
  /**
   * @method empty search results dynamic template container
   */
  createEmptyResultsTemplate() {
    this.templateContainer.clear();
    const factory = this.factoryResolver.resolveComponentFactory(EmptySearchTemplateComponent);
    const dynamicComponentRef = this.templateContainer.createComponent(factory);
    dynamicComponentRef.instance.title = NO_RESULTS;
  };
  /**
   * @method reactive form builder
   */
  searchFormBuilder() {
    this.searchForm = this.formBuilder.group({
      searchInput: new FormControl('', Validators.required)
    });
  };

}
