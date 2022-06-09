import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({providedIn: 'root'})
export class DocumentService {
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  getWindow(): Window | null {
    return this.document.defaultView;
  }

  getLocation(): Location | null {
    return this.document.location;
  }

  getLocalStorage(): Storage | null {
    return this.getWindow()?.localStorage;
  }
}
