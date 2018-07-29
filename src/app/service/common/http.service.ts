import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import {CommonUtil} from '../../utils/commonUtil';
import {CommonConfig} from '../../config/commonConfig';
import {Router} from '@angular/router';

declare var $:any;
declare var layer:any;
@Injectable()
export class HttpService {

  jsonHeader = new HttpHeaders({'Content-Type': 'application/json'});
  formHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(
    private http: HttpClient,
    private commonUtil: CommonUtil,
    private commonConfig:CommonConfig,
    private router: Router
  ) { }

  HttpPost(url: string ,requestData: any,header?:HttpHeaders) {
    if(this.commonUtil.isNull(header)){
      header = this.jsonHeader;
      return this.http.post(url,JSON.stringify(requestData),{headers:header})
        .toPromise()
        .then(res => this.handleSuccess((res)))
        .catch(error => this.handleError(error));
    }else{
      return this.http.post(url,$.param(requestData),{headers:header})
        .toPromise()
        .then(res => this.handleSuccess((res)))
        .catch(error => this.handleError(error));
    }
  }

  HttpGet(url: string) {
    return this.http.get(url,{headers:this.formHeader})
      .toPromise()
      .then(res => this.handleSuccess((res)))
      .catch(error => this.handleError(error));
  }

  HttpDelete(url: string) {
    return this.http.delete(url,{headers:this.formHeader})
      .toPromise()
      .then(res => this.handleSuccess((res)))
      .catch(error => this.handleError(error));
  }

  HttpPut(url: string ,requestData: any,header?:HttpHeaders) {
    if(this.commonUtil.isNull(header)){
      header = this.jsonHeader;
      return this.http.put(url,JSON.stringify(requestData),{headers:header})
        .toPromise()
        .then(res => this.handleSuccess((res)))
        .catch(error => this.handleError(error));
    }else{
      return this.http.put(url,$.param(requestData),{headers:header})
        .toPromise()
        .then(res => this.handleSuccess((res)))
        .catch(error => this.handleError(error));
    }
  }

  private handleSuccess(result) {
    if (result && (result.status !== this.commonConfig.RESPONSE_CODE.SUCCESS)) { // 由这里统一处理请求返回数据失败的情况
      if( ! this.commonUtil.isNull(result.msg)){
        layer.msg(result.msg, {icon: 5});
      }
    }else if( ! this.commonUtil.isNull(result.msg)){
        layer.msg(result.msg, {icon: 6});
    }
    return result;
  }

  private handleError(errorResponse: Response | any) {
    let msg = errorResponse.error.msg;
    if (errorResponse.status === 0) {
      msg = '请求地址错误';
    }
    if (errorResponse.status === 400) {
      msg = '请求无效';
    }
    if (errorResponse.status === 404) {
      msg = '请求资源不存在';
    }
    if (errorResponse.status === 504) {
      msg = '请求超时,连接服务器异常';
    }
    if (errorResponse.status === 401 && errorResponse.error.status === this.commonConfig.RESPONSE_CODE.NEED_LOGIN) {
      localStorage.removeItem("user");
      this.router.navigate(["/login"]);
    }
    layer.msg(msg, {icon: 2}); // 由这里统一处理error,不需要每次都catch
    console.log(errorResponse,msg);
  }

}

