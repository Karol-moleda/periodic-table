import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeriodicTableService } from '../services/periodic-table.service';
import { PeriodicTableElement } from '../models/elements-interface';
import { ModalForFilteringComponent } from '../modal-for-filtering/modal-for-filtering.component';

@Component({
  selector: 'app-periodic-table-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './periodic-table-page.component.html',
  styleUrl: './periodic-table-page.component.scss',
})
export class PeriodicTablePageComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  elements: PeriodicTableElement[] = [];
  value: string = '';
  valueSearch$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredElements$: Observable<PeriodicTableElement[]> = new Observable<PeriodicTableElement[]>();

  protected subscriptions = new Subscription();

  constructor(
    private periodicTableService: PeriodicTableService,
    public dialog: MatDialog,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.viewElements();
    this.searchElement();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  viewElements() {
    this.subscriptions.add(
      this.periodicTableService.getElements().subscribe({
        next: (elements) => {
          this.elements = [...elements];
        },
        error: (error) => {
          console.error('Error during fetching elements:', error);
        },
      }),
    );
  }

  searchElement() {
    this.filteredElements$ = this.valueSearch$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((element) => this.filterElements(element)),
    );
  }

  filterElements(searchTerm: string): Observable<PeriodicTableElement[]> {
    if (!searchTerm) {
      return of(this.elements);
    }
    return of(this.elements).pipe(
      map((elements) =>
        elements.filter((el: PeriodicTableElement) => this.matchesSearchTerm(el, searchTerm)),
      ),
    );
  }

  matchesSearchTerm(element: PeriodicTableElement, searchTerm: string): boolean {
    return (
      element.position.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.weight.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  openModal(element: PeriodicTableElement): void {
    const dialogRef = this.dialog.open(ModalForFilteringComponent, {
      width: '300px',
      data: { ...element },
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const updatedElement = { ...result };
          this.periodicTableService.updateElement(updatedElement).subscribe({
            next: (response) => {
              this.elements = this.elements.map((item) =>
                item.position === updatedElement.position ? { ...response } : item,
              );
              this.filteredElements$ = of(this.elements);
            },
            error: (error) => {
              console.error('Error during update:', error);
            },
          });
        }
      }),
    );
  }

  updateElement(updatedElement: any): void {
    this.elements = this.elements.map((el: any) =>
      el.position === updatedElement.position ? updatedElement : el,
    );
  }

  clearTable() {
    this.value = '';
    this.filteredElements$ = of(this.elements);
  }
}
