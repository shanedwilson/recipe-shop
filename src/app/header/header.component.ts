import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(
        private dataStorageServide: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>,
    ) {}
    collapsed = true;

    ngOnInit() {
       this.userSub = this.store.select('auth').pipe(map(authState => authState.user))
       .subscribe(user => {
        this.isAuthenticated = !user ? false : true;
       });
    }

    onSaveData() {
        this.dataStorageServide.storeRecipes();
    }

    onFetchData() {
        this.dataStorageServide.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logOut();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
