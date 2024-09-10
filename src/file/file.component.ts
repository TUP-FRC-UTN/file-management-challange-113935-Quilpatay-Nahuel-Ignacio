import { Component, EventEmitter, Output } from '@angular/core';
import { FileItem, FileType } from '../models/file.item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './file.component.html',
})
export class FileComponent {
  newFile: FileItem = {
    id: '',
    name: '',
    creation: new Date(),
    type: FileType.FILE,
    owners: []
  };
  FileType = FileType;
  @Output() newFileEvent = new EventEmitter<FileItem>();

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
  }
}
