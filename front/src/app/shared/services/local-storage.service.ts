import { Injectable } from '@angular/core';
import { DocumentService } from '@root/app/shared/services/document.service';

@Injectable({providedIn: 'root'})
export class LocalStorageService {

  private storage = {};

  constructor(
    private readonly documentService: DocumentService
  ) {
  }

  setItem(key: string, value: string): void {
    const ls = this.documentService.getLocalStorage();
    if (ls) {
      ls.setItem(key, value);
    } else {
      this.storage[key] = value;
    }
  }

  getItem(key: string): string | null {
    const ls = this.documentService.getLocalStorage();
    if (ls) {
      return ls.getItem(key);
    } else {
      return this.storage[key];
    }
  }

  removeItem(key: string): void {
    const ls = this.documentService.getLocalStorage();
    if (ls) {
      ls.removeItem(key);
    } else {
      delete this.storage[key];
    }
  }
}
