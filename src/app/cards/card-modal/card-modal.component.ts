import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit{
  cardForm!: FormGroup;
  showSpinner:boolean = false;
  constructor(
    private snackBarService:SnackbarService,
    private dialogRef: MatDialogRef<CardModalComponent>,
    private _snackBar:MatSnackBar,
    private fb: FormBuilder,
    private cardService: CardService,
    @Inject(MAT_DIALOG_DATA) public data:Card
  ){}
  ngOnInit(): void {
      this.cardForm = this.fb.group({
        name:[this.data?.name || '',Validators.maxLength(50)],
        title:[this.data?.title || '',[Validators.required,Validators.maxLength(255)]],
        phone:[this.data?.phone || '',[Validators.required,Validators.maxLength(20)]],
        email:[this.data?.email || '',[Validators.email,Validators.maxLength(50)]],
        address:[this.data?.address || '',Validators.maxLength(255)]
      });
  }

  addCard():void
  {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value).subscribe((response:any) => {
      this.getSuccess(response || "Kartvizit eklendi")
    },(error:any)=>{
      this.getError(error.message)
    })
  }


  updateCard():void
  {
    this.showSpinner = true;

    this.cardService.updateCard(this.cardForm.value,this.data.id).subscribe((response:any)=>{
      this.getSuccess(response || "Kartvizit güncellendi")
    },(error:any)=>{
      this.getError(error.message)
    });
  }

  deleteCard():void
  {
    this.showSpinner = true;

    this.cardService.deleteCard(this.data.id)
    .subscribe((response:any)=>{
      this.getSuccess(response || "Kartvizit silindi")
    },(error:any)=>{
      this.getError(error.message)
    })
  }

  getSuccess(message: string):void
  {
    this.snackBarService.createSnackBar('success',message)
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message:string):void
  {
    this.snackBarService.createSnackBar('error',message)
    this.showSpinner = false
  }
}

