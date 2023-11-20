import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialogue/delete-dialogue.component';
import { EditDialogueComponent } from 'src/shared/components/edit-dialogue/edit-dialogue.component';
import { User } from 'src/shared/interfaces/user.interface';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';
import { RouterService } from 'src/shared/services/router.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit {
  data!: User[];
  user!: User;
  isAdmin = false;
  isLoading!: boolean;

  // MatTable Config
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'phone',
    'designation',
    'departmentName',
  ];

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private authService: AuthService,
    public router: RouterService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.apiService.fetchAllUsers().subscribe((data) => {
      this.data = data;

      // MatTable Config
      this.dataSource = new MatTableDataSource(this.data);

      this.isLoading = false;
    });

    this.authService.userData$.subscribe((user) => {
      this.user = user;
      if (this.user.role == 'Admin') {
        this.isAdmin = true;
        this.displayedColumns.push('adminActions');
      }
    });
  }

  /**
   * @description Opens the Delete Dialogue
   * @param id ID of USER to be removed
   */
  handleRemove(id: string, name: string, email: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: id,
        name: name,
        email: email,
      },
    });

    dialogRef.afterClosed().subscribe((val: boolean) => {
      if (val) {
        this.data = this.data.filter((user) => user.id != id);
        this.dataSource = new MatTableDataSource(this.data);
      }
    });
  }

  /**
   * @description Opens the edit user dialogue for the selected user
   * @param user USER to edit
   */
  openEditDialogue(user: User) {
    const dialogRef = this.dialog.open(EditDialogueComponent, {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        designation: user.designation,
        departmentName: user.departmentName,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  /**
   * @description Utility function to filter from MatTable
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
