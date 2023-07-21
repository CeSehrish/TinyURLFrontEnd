import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TinyURLGenerationComponent } from './Components/tiny-urlgeneration/tiny-urlgeneration.component';

const routes: Routes = [
  {
    path:'',
    component:TinyURLGenerationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
