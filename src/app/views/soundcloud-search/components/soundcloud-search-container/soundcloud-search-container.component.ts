import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '../../../../../../node_modules/@angular/forms';
import { SearchService } from '../../services/search.service';
import { ISoundCloudTrackResponse } from '../../models/sound-cloud-track.model';
import { MatMenuTrigger } from '../../../../../../node_modules/@angular/material/menu';

@Component({
  selector: 'app-soundcloud-search-container',
  templateUrl: './soundcloud-search-container.component.html',
  styleUrls: ['./soundcloud-search-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SoundcloudSearchContainerComponent implements OnInit {

  searchForm: FormGroup;

  isResponse: boolean = false;

  response: any[] = [];

  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService,
    private ref: ChangeDetectorRef) {
    this.searchForm = this.formBuilder.group({
      searchInput: new FormControl('', Validators.required)
    });
    console.log(this.searchForm)
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.searchForm.valid) {
      console.log('valid');
      const searchParam = this.searchForm.controls['searchInput'].value;
      this.searchService.search(searchParam).then((tracksResponse: ISoundCloudTrackResponse) => {
        console.log(tracksResponse);
        this.isResponse = (tracksResponse.collection.length > 0) ? true : false;
        this.response = tracksResponse.collection;
  
        this.ref.detectChanges();
        console.log(this.isResponse)
        return tracksResponse;
      });
    } else {
      console.log('not valid');
      return false;
    }
  }

}
