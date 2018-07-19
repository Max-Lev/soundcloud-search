import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundcloudSearchContainerComponent } from './components/soundcloud-search-container/soundcloud-search-container.component';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { SearchResultsTemplateComponent } from './components/search-results-template/search-results-template.component';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { EmptySearchTemplateComponent } from './components/empty-search-template/empty-search-template.component';
export const routes: Routes = [
  {
    path: '', component: SoundcloudSearchContainerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule
  ],
  declarations: [
    SoundcloudSearchContainerComponent,
    SearchResultsTemplateComponent,
    EmptySearchTemplateComponent
  ],
  providers: [SearchService],
  entryComponents: [
    EmptySearchTemplateComponent,
    SoundcloudSearchContainerComponent
  ],
  exports: [
    EmptySearchTemplateComponent,
    SoundcloudSearchContainerComponent
  ]
})
export class SoundcloudSearchModule { }
