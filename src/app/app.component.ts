import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem, FileOwner, FileType } from '../models/file.item.model';
import { FILE_LIST, OWNERS } from '../data/file.storage';
import { CommonModule } from '@angular/common';
import { FileComponent } from '../file/file.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FileComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  files: FileItem[] = FILE_LIST;
  folders: FileItem[] = [];
  allOwners: FileOwner[] = OWNERS;
  selectedFilesIds: string[] = [];
  title = 'file-management';
  FileType = FileType;
  showFileModal = false;

  ngOnInit() {
    this.loadFolders();
    this.sortFiles();
  }

  loadFolders() {
    this.folders = this.files.filter(file => file.type === FileType.FOLDER);
  }

  openFileModal() {
    this.showFileModal = true;
  }

  closeFileModal() {
    this.showFileModal = false;
  }

  addFile(newFile: FileItem) {
    this.files.push(newFile);
    this.sortFiles();
    this.closeFileModal();
  }

  sortFiles() {
    this.files.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === FileType.FOLDER ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }

  isFileSelected(file: FileItem): boolean {
    return this.selectedFilesIds.includes(file.id);
  }

  toggleFileSelection(file: FileItem) {
    const fileIndex = this.selectedFilesIds.indexOf(file.id);
    if (fileIndex > -1) {
      this.selectedFilesIds.splice(fileIndex, 1);
    } else {
      this.selectedFilesIds.push(file.id);
    } 
  }

  deleteFiles() {
    if (this.selectedFilesIds.length === 0) return;

    if (this.selectedFilesIds.length === 1) {
      this.files = this.files.filter(file => !this.selectedFilesIds.includes(file.id));
    } else {
      if (confirm(`¿Estás seguro de que deseas borrar ${this.selectedFilesIds.length} elementos?`)) {
        this.files = this.files.filter(file => !this.selectedFilesIds.includes(file.id));
      }
    }

    this.selectedFilesIds = [];
  }
}
