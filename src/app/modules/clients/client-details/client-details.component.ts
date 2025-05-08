import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './client-details.component.html'
})
export class ClientDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public client: Client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  objectKeys = Object.keys;
}
