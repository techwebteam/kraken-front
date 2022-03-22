import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryISO, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { IkrakenValidator, INPUTTYPEFIELDS, KrakenFieldSetting, VALIDATE_FIELDS } from './settingField.component';

@Component({
  selector: 'kraken-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class KrakenFieldComponent implements OnInit {

  @ViewChild('content') content:ElementRef;
  @Input() value: any;
  @Input() id: string="";
  @Input() placeholder: string="";
  @Input() block: boolean = false;
  @Input() toolTip: string;
  @Input() validators?: IkrakenValidator[];
  @Input() label: string;
  @Input() type?:  INPUTTYPEFIELDS;
  @Input() required?:  boolean;
  @Input() icon?:  string = "fas fa-question-circle";
  @Input() values?:any;
  @Input() bindLabel?:string;


  //phone variables
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Guatemala];
  
  messageError:string = "";
  edit = false;
  keyTrigger = false;
  TYPE_FIELDS =INPUTTYPEFIELDS;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngAfterViewInit(): void {
    
  }

  phoneForm: FormGroup;

  ngOnInit(): void {
    this.phoneForm = this.formBuilder.group({
      phone: [undefined, [Validators.required]],
      label: ["", Validators.required],
    });
  }


  validator(){
    let result;
    if (this.type === INPUTTYPEFIELDS.PHONE) {
      let phone = this.phoneForm.value.phone;
      result = !phone? false : true;
    }
    else{
      result = this.validators?.find((fun)=>{
        const krakenVal = fun?.function(this.value);
        if (krakenVal==VALIDATE_FIELDS.INVALID) {
          this.messageError = fun.message;
        }
        return krakenVal;
      });
    }
    
    return (result? VALIDATE_FIELDS.INVALID : VALIDATE_FIELDS.VALID)
  }

  get fphone() {
    return this.phoneForm.controls;
  }

  public get FinalValue(){
    if (!this.id) {
      console.error("Falta definir id "  + this.placeholder);
    }
    console.log(this.value);
    return this.value;
  }

  keyFunc($event:any){
    this.keyTrigger = true;
  }

}
