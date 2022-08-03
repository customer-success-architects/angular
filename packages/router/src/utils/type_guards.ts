/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch} from '../models';
import {NAVIGATION_CANCELING_ERROR, NavigationCancelingError, RedirectingNavigationCancelingError} from '../navigation_canceling_error';
import {isUrlTree} from '../url_tree';

/**
 * Simple function check, but generic so type inference will flow. Example:
 *
 * function product(a: number, b: number) {
 *   return a * b;
 * }
 *
 * if (isFunction<product>(fn)) {
 *   return fn(1, 2);
 * } else {
 *   throw "Must provide the `product` function";
 * }
 */
export function isFunction<T>(v: any): v is T {
  return typeof v === 'function';
}

export function isBoolean(v: any): v is boolean {
  return typeof v === 'boolean';
}

export function isCanLoad(guard: any): guard is CanLoad {
  return guard && isFunction<CanLoad>(guard.canLoad);
}

export function isCanActivate(guard: any): guard is CanActivate {
  return guard && isFunction<CanActivate>(guard.canActivate);
}

export function isCanActivateChild(guard: any): guard is CanActivateChild {
  return guard && isFunction<CanActivateChild>(guard.canActivateChild);
}

export function isCanDeactivate<T>(guard: any): guard is CanDeactivate<T> {
  return guard && isFunction<CanDeactivate<T>>(guard.canDeactivate);
}
export function isCanMatch(guard: any): guard is CanMatch {
  return guard && isFunction<CanMatch>(guard.canMatch);
}

export function isRedirectingNavigationCancelingError(
    error: unknown|
    RedirectingNavigationCancelingError): error is RedirectingNavigationCancelingError {
  return isNavigationCancelingError(error) && isUrlTree((error as any).url);
}

export function isNavigationCancelingError(error: unknown): error is NavigationCancelingError {
  return error && (error as any)[NAVIGATION_CANCELING_ERROR];
}
