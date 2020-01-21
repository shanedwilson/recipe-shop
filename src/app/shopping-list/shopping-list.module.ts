import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRoutingModule } from './shoppping-list-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule ({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        ShoppingListRoutingModule
    ]
})

export class ShoppingListModule {}
