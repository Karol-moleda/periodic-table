import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PeriodicTableElement } from '../models/elements-interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-for-filtering',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule],
  templateUrl: './modal-for-filtering.component.html',
  styleUrl: './modal-for-filtering.component.scss',
})
export class ModalForFilteringComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalForFilteringComponent>,
    @Inject(MAT_DIALOG_DATA) public element: PeriodicTableElement,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
