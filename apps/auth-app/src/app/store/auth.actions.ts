import { createAction, props } from "@ngrx/store";

export const registerStart = createAction(
    '[Auth] Register Start',
    props<{ username: string; email: string; password: string }>()
);

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ user: any; token: string }>()
);

export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: string }>()
);

export const loginStart = createAction(
    '[Auth] Login Start',
    props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: any; token: string; expiration: Date }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
