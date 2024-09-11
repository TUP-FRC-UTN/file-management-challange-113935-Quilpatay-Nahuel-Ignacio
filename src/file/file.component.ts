import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileItem, FileOwner, FileType } from '../models/file.item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './file.component.html',
})
export class FileComponent {
  @Input() folders: FileItem[] = [];
  @Input() allOwners: FileOwner[] = [];

  newFile: FileItem = {
    id: '',
    name: '',
    creation: new Date(),
    type: FileType.FILE,
    owners: []
  };

  selectedOwner: FileOwner | null = null;
  FileType = FileType;

  @Output() newFileEvent = new EventEmitter<FileItem>();
  @Output() closeModal = new EventEmitter<void>();

  submitFileForm() {
    if (this.newFile.name === '' || !this.newFile.creation) {
      alert('Por favor, complete los campos obligatorios');
      return;
    }

    this.newFile.id = Math.random().toString(36).substring(7);
    this.newFileEvent.emit(this.newFile);

    this.newFile = {
      id: '',
      name: '',
      creation: new Date(),
      type: FileType.FILE,
      owners: []
    };

    this.closeModal.emit();
  }

  close() {
    this.closeModal.emit();
  }

  addOwner() {
    if (this.selectedOwner && !this.newFile.owners.includes(this.selectedOwner)) {
      this.newFile.owners.push(this.selectedOwner);
      this.selectedOwner = null;
    }
  }

  removeOwner(owner: FileOwner) {
    this.newFile.owners = this.newFile.owners.filter(o => o !== owner);
  }
}
