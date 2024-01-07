import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { GabaritsService } from '../gabarits.service';
import { AddEditGabComponent } from '../add-edit-gab/add-edit-gab.component';

@Component({
  selector: 'app-gabarits',
  templateUrl: './gabarits.component.html',
  styleUrls: ['./gabarits.component.css']
})
export class GabaritsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Designation',
    'Fonction',
    'Action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _gabaritsservice: GabaritsService) {}

  ngOnInit(): void {
    this.getGabList();
  }

  getGabList() {
    this._gabaritsservice.getGabList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteGab(id: string) {
    this._gabaritsservice.deleteGab(id).subscribe({
      next: (res) => {
        alert('Gabarit supprimé.');
        this.getGabList();
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditGabForm(data: any) {
    const dialogRef = this._dialog.open(AddEditGabComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGabList();
        }
      },
    });
  }

  openAddGabForm() {
    const dialogRef = this._dialog.open(AddEditGabComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGabList();
        }
      },
    });
  }
}
