import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundcloudSearchContainerComponent } from './components/soundcloud-search-container/soundcloud-search-container.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '../../../../node_modules/@angular/forms';
import { SearchService } from './services/search.service';
import { HttpClientModule } from '../../../../node_modules/@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
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
    MatMenuModule
  ],
  declarations: [
    SoundcloudSearchContainerComponent
  ],
  providers: [SearchService]
})
export class SoundcloudSearchModule { }
