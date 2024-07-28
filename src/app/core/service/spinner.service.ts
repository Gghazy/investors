import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  show() {
    this._isLoading = true;
  }

  hide() {
    this._isLoading = false;
  }
}