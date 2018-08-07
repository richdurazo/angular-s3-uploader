import { environment } from './../../environments/environment';
import { error } from '../../../node_modules/protractor';
import { stringify } from '../../../node_modules/@angular/core/src/render3/util';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { splitAtColon } from '../../../node_modules/@angular/compiler/src/util';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];
  @ViewChild('fileInput') fileInput: ElementRef;
  fileDataUri = '';
  errorMsg = '';
  imageUrl = '';
  imageAdded = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  previewFile() {
    const file = this.fileInput.nativeElement.files[0];
    if (file && this.validateFile(file)) {

      const reader = new FileReader();
      reader.readAsDataURL(this.fileInput.nativeElement.files[0]);
      reader.onload = () => {
        this.fileDataUri = reader.result;
      };
    } else {
      this.errorMsg = 'File must be jpg, png, or gif and cannot be exceed 500 KB in size';
    }
  }

  uploadFile(event: Event) {
    event.preventDefault();
    // get only the base64 file
    if (this.fileDataUri.length > 0) {
      const base64File = this.fileDataUri.split(',')[1];
      // ToDo: send to server
      console.log(base64File);
      const img = {'image': base64File};
      const data = Object.assign({}, img);
      console.log(data);
      const cors = JSON.stringify(data)

      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

      const options = {
        headers
      };
      this.http.post(`${environment.apiUrl}/upload-photo`, cors, options)
        .subscribe(
          res => {
            if (res) {
              console.log('res', res);
              this.imageAdded = true;
              this.imageUrl = res['url'];
              this.fileInput.nativeElement.value = '';
            }

          },
          err => {
            console.log('ERROR', err);
            this.errorMsg = 'Could not upload image.';
          }
        );
    }
  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 500000;
  }

}
