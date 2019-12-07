import { Injectable } from '@angular/core';
import {finalize, tap} from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Observable} from 'rxjs';


export interface ImageFile {
  name: string;
  filepath: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  // Upload Task
  task: AngularFireUploadTask;
  // Progress in percentage
  percentage: Observable<number>;
  // Uploaded File URL
  UploadedFileURL: Observable<string>;
  // Uploaded Image List
  images: Observable<ImageFile[]>;

  // File details
  fileName: string;
  fileSize: number;

  // Status check
  isUploading: boolean;
  isUploaded: boolean;

  private imageCollection: AngularFirestoreCollection<ImageFile>;
  constructor(
    private storage: AngularFireStorage,
    private database: AngularFirestore
  ) {
    this.imageCollection = database.collection<ImageFile>('Images');
    this.images = this.imageCollection.valueChanges();
  }

  uploadFile(event: FileList) {
    // The File object
    const file = event.item(0);
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }
    this.isUploading = true;
    this.isUploaded = false;
    this.fileName = file.name;
    // The storage path
    const path = `Images/${new Date().getTime()}_${file.name}`;
    // File reference
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file, {});

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();

        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        });
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    ).subscribe();
  }

  addImagetoDB(image: ImageFile) {
    // Create an ID for document
    const id = this.database.createId();

    // Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log('resp', resp);
    }).catch(error => {
      console.log('error ' + error);
    });
  }

}
