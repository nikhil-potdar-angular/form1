import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service'; 
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   users:any=[]
   form!:FormGroup;
   result:any;
 

   constructor(private fb:FormBuilder,private service:HttpService) { }

  ngOnInit(): void {
    //  this.service.getUsers().subscribe((data:any)=>{
    //    console.log(data);
    //    this.users=data.data
    //  })
    this.creatForm();

  }

 creatForm(){
    this.form = this.fb.group(
      {
        fName: [null],
        lName: [null],
        addresses: this.addressForm(),
        contacts: this.fb.array([this.contactFrom()])
      }
    );
  }

  addressForm(){
    return this.fb.group(
      {
        address1: [null],
        address2: [null],
        country: [null],
        state: [null]
      }
    )
  }

  get addresses(){
  return this.form.get("addresses") as FormGroup;
  }


  get contacts(){
    return this.form.get("contacts") as FormArray;
    }

  contactFrom(){
    return this.fb.group(
      {
        phone: [null],
        email: [null]
      }
    );
  }

  onSave(){
    console.log(this.form.getRawValue())
    this.result = this.form.getRawValue();
  }

  addNewContacts(){
    console.log(this.contacts.value)
    this.contacts.push(this.contactFrom());
    console.log(this.contacts.value)
  }

  removeContact(i:Required<number>){
    this.contacts.removeAt(i);
  }
}

