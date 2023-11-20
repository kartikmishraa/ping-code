import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  LIST_OF_DEPARTMENTS,
  LIST_OF_DESIGNATIONS,
} from 'src/shared/constants/lists.constant';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-edit-dialogue',
  templateUrl: './edit-dialogue.component.html',
  styleUrls: ['./edit-dialogue.component.scss'],
})
export class EditDialogueComponent {
  LIST_OF_DEPARTMENTS = LIST_OF_DEPARTMENTS;
  LIST_OF_DESIGNATIONS = LIST_OF_DESIGNATIONS;

  constructor(
    public dialogRef: MatDialogRef<EditDialogueComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editProfileForm.setValue({
      name: String(this.data.name),
      phoneNumber: String(this.data.phoneNumber),
      designation: String(this.data.designation),
      departmentName: String(this.data.departmentName),
    });
  }

  editProfileForm = this.fb.group({
    name: [
      this.data.name,
      [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
      ],
    ],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    ],
    designation: ['', Validators.required],
    departmentName: ['', Validators.required],
  });

  handleSubmit(): void {
    this.apiService.updateUser(
      String(this.data.id),
      this.editProfileForm.value
    );
    this.dialogRef.close();
  }
}
