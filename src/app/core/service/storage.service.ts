import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
@Injectable({ providedIn: 'root', })
export class StorageService {
  /**********[Fields]************************************************ */
  /****************************************************************** */
  static get _storage() {
    return (localStorage.getItem('rememberCurrentUser') === 'true') ? localStorage : sessionStorage;
  }
  static setRememberCurrentUser(flag: boolean) {
    localStorage.setItem('rememberCurrentUser', flag.toString());
  }
  static getRememberCurrentUser(): boolean {
    return localStorage.getItem('rememberCurrentUser') == 'true' ? true : false;
  }
  static getuserName() {
    let userName = this._storage.getItem('userName') ?? '';
    return userName;
  }
  static setCurrentUserInfo(userName: string) {
    this._storage.setItem('userName', userName);
  }
  static setCurrentUserPhoto(photo: string) {
    this._storage.setItem('photo', photo);
  }
  static getCurrentUserPhoto() {
    let userName = this._storage.getItem('photo') ?? '';
    return userName;
  }
  static clearCurrentUserInfo() {
    this._storage.removeItem('currentUser');
  }
  static setToken(token: string) {
    this._storage.setItem('TOKEN', token);
  }
  static getToken(): string {
    return this._storage.getItem('TOKEN') ?? "";
  }
  static clearToken() {
    this._storage.removeItem('TOKEN');
  }


  static getLanguage(): string {
    return this._storage.getItem('lang') ?? '';
  }
  static clearLanguage() {
    this._storage.removeItem('lang');
  }
  static getShowMenu(): boolean {
    return localStorage.getItem("showMenu") === "true" ? true : false;
  }
  static getStartShowMenu(): boolean {
    return localStorage.getItem("showMenu_start") === "true" ? true : false;
  }
  static clearAllLocalStorage() {
    localStorage.clear()
    sessionStorage.clear()
  }
}

