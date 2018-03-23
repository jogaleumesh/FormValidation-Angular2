import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public checkError;
  public loginForm: FormGroup;
  private formSumitAttempt: boolean;



  constructor(public fb: FormBuilder) {
    let phone_REGEXP = /^\d{10}$/;
    let email_REGEXP = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
    this.loginForm = this.fb.group({
      mobile: ['', Validators.compose([
        Validators.required,
        Validators.pattern(phone_REGEXP)
      ])
      ],
      email:['', Validators.compose([
          Validators.required,
          Validators.pattern(email_REGEXP)
      ])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ])
      ]
    })
  }

  ngOnInit() {
  }

  isFieldValid(field: string) {
    var form = this.loginForm;

    if ((form.get(field).errors && form.get(field).errors.required && form.get(field).touched) || (form.get(field).untouched && this.formSumitAttempt)) {
      return {
        error: 'required',
        msg:`${field} is required.`
      };
    }
    if ((form.get(field).errors && form.get(field).errors.pattern && form.get(field).touched) || (form.get(field).untouched && this.formSumitAttempt)) {
      return {
        error:'pattern',
        msg:`please enter valid ${field}.`
      };
    }
    if ((form.get(field).errors && form.get(field).errors.minlength && form.get(field).touched) || (form.get(field).untouched && this.formSumitAttempt)) {
      return {
        error:'minlength',
        msg:`${field} has be more than ${this.loginForm.get(field).errors.minlength.requiredLength} char.`
      };
    }
    if ((form.get(field).errors && form.get(field).errors.maxlength && form.get(field).touched) || (form.get(field).untouched && this.formSumitAttempt)) {
      return {
        error:'maxlength',
        msg:`${field} has be less than ${this.loginForm.get(field).errors.maxlength.requiredLength} char.`
      };
    }
    else {
      return {
        error:null
      }
    }
  }

  displayFieldCss(field:string) {
    return {
      'has-error': (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSumitAttempt)

    };
  }

  login(values) {
    this.formSumitAttempt = true;
    if (this.loginForm.valid) {
      console.log(values);
    }
  }

}
