import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(
        private dataStorageServide: DataStorageService,
        private authService: AuthService
    ) {}
    collapsed = true;

    ngOnInit() {
       this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !user ? false : true;
       });
    }

    onSaveData() {
        this.dataStorageServide.storeRecipes();
    }

    onFetchData() {
        this.dataStorageServide.fetchRecipes().subscribe();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
