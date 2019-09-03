import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main.routing';
import { MainComponent } from './main.component';

import { SideNavigationComponent } from 'src/app/core/components/menu/side-navigation/side-navigation.component';
import { TopNavbarComponent } from 'src/app/core/components/menu/top-navbar/top-navbar.component';

@NgModule({
  declarations: [
    MainComponent,
    SideNavigationComponent,
    TopNavbarComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
