import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  LIST_OF_DEPARTMENTS,
  LIST_OF_DESIGNATIONS,
} from 'src/shared/constants/lists.constant';
import { User } from 'src/shared/interfaces/user.interface';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';
import { RouterService } from 'src/shared/services/router.service';
import { ToastService } from 'src/shared/services/toast.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  isLoading = false;
  user!: User;
  LIST_OF_DESIGNATIONS = LIST_OF_DESIGNATIONS;
  LIST_OF_DEPARTMENTS = LIST_OF_DEPARTMENTS;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private router: RouterService,
    private toaster: ToastService
  ) {}

  editProfileForm = this.fb.group({
    name: [
      '',
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

  ngOnInit(): void {
    console.log('here');
    this.authService.userData$.subscribe((user) => {
      this.user = user;

      // Set default values
      if (this.user.isProfileSetup) {
        this.editProfileForm.setValue({
          name: String(this.user.name), // CHECK HERE
          phoneNumber: String(this.user.phoneNumber),
          designation: String(this.user.designation),
          departmentName: String(this.user.departmentName),
        });
      }
    });
  }

  /**
   * @description Submits the forms, updates DB and local userData
   */
  handleSubmit(): void {
    this.isLoading = true;
    this.apiService
      .updateUser(String(this.user.id), this.editProfileForm.value)
      .subscribe(
        () => {
          this.authService.updateUserData(`${this.user.id}`);
          this.toaster.makeToast('Profile successfully edited');
          this.isLoading = false;
          this.router.redirectToUrl('/profile');
        },
        (err) => {
          this.isLoading = false;
          console.log('error: ', err);
          this.toaster.makeToast('Something went wrong, check logs');
        }
      );
  }

  /**
   * @description Handles reset form functionality
   */
  handleReset(): void {
    // Set default values
    if (this.user.isProfileSetup) {
      this.editProfileForm.setValue({
        name: String(this.user.name), // CHECK HERE
        phoneNumber: String(this.user.phoneNumber),
        designation: String(this.user.designation),
        departmentName: String(this.user.departmentName),
      });
    } else {
      this.editProfileForm.reset();
    }
  }

  goBack(): void {
    this.router.redirectToUrl('/profile');
  }
}
