import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
