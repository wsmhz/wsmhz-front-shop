import {FormControl, FormGroup} from "@angular/forms";

export function equalValidator(group: FormGroup): any  {
  let password:FormControl = group.get('password') as FormControl;
  let pconfirm:FormControl = group.get('pconfirm') as FormControl;
  let valid: Boolean = false;
  if(password && pconfirm){
    valid = (password.value === pconfirm.value);
  }
  return valid ? null : {equal: {description:'密码和确认密码不匹配!'}};
}
