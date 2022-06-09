import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: '[matButtonSpinner]'
})
export class MatButtonSpinnerDirective implements OnInit, OnChanges {

  @Input() matButtonSpinner: boolean;
  private initDone = false;

  constructor(
    private element: ElementRef<HTMLButtonElement>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnChanges(): void {
    if (!this.initDone) {
      return;
    }

    this.updateVisibility();
  }

  ngOnInit(): void {
    this.element.nativeElement.classList.add('mat-button-spinner');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MatSpinner);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const buttonWrapper = this.element.nativeElement.querySelector('.mat-button-wrapper');
    buttonWrapper.insertBefore(componentRef.location.nativeElement, buttonWrapper.firstChild)
    this.initDone = true;
    this.updateVisibility();
  }

  private updateVisibility(): void {
    const activeClassName = 'mat-button-spinner--active';
    if (this.matButtonSpinner) {
      this.element.nativeElement.classList.add(activeClassName);
    } else {
      this.element.nativeElement.classList.remove(activeClassName);
    }
  }
}
