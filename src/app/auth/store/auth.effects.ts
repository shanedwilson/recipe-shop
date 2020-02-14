import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../../appsettings.json';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + AppSettings.firebaseKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            )
            .pipe(
                map(resData => {
                    const experiationDate = new Date(
                        new Date().getTime() + +resData.expiresIn * 1000);
                    return of(
                        new AuthActions.Login({
                        email: resData.email,
                        userId: resData.localId,
                        token: resData.idToken,
                        expirationDate: experiationDate
                        })
                    );
                }),
                catchError(error => {
                return of();
                }),
            );
        }),
    );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
