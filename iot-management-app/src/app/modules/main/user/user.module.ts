import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user.routing';
import { UserService } from './user.service';
import { UserComponent } from './user.component';

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        UserService
    ]
})
export class UserModule { }
