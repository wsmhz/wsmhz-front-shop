import { Injectable} from "@angular/core";

@Injectable()
export class CommonConfig{

  RESPONSE_CODE = {
    SUCCESS : 0,
    NEED_LOGIN : -10,
    ERROR : 1
  };
}
