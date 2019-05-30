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

  HttpPost(url: string ,requestData: any, header?:HttpHeaders, servicePrefix?: string) {
    url = this.handlerUrl(servicePrefix, url);
    if(this.commonUtil.isNull(header)){
      header = this.addAuthorization(this.jsonHeader);
      return this.http.post(url,JSON.stringify(requestData),{headers:header})
        .toPromise()
        .then(res => this.handleSuccess((res)))
        .catch(error => this.handleError(error));
    }else{
      if(url !== "oauth-service/system/login"){
        header = this.addAuthorization(header);
      } else {
        header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic d3NtaHo6d3NtaHpzZWNyZXQ='});
      }
      return this.http.post(url,$.param(requestData),{headers:header})
        .toPromise()
        .then(res => this.handleSuccess((res)))
        .catch(error => this.handleError(error));
    }
  }

  HttpGet(url: string, servicePrefix?: string) {
    url = this.handlerUrl(servicePrefix, url);
    let header = this.addAuthorization(this.formHeader);
    return this.http.get(url,{headers: header})
      .toPromise()
      .then(res => this.handleSuccess((res)))
      .catch(error => this.handleError(error));
  }

  HttpDelete(url: string, servicePrefix?: string) {
    url = this.handlerUrl(servicePrefix, url);
    let header = this.addAuthorization(this.formHeader);
    return this.http.delete(url,{headers: header})
      .toPromise()
      .then(res => this.handleSuccess((res)))
      .catch(error => this.handleError(error));
  }

  HttpPut(url: string ,requestData: any,header?:HttpHeaders, servicePrefix?: string) {
    url = this.handlerUrl(servicePrefix, url);
    if(this.commonUtil.isNull(header)){
      header = this.addAuthorization(this.jsonHeader);
      return this.http.put(url,JSON.stringify(requestData),{headers:header})
        .toPromise()
        .then(res => this.handleSuccess((res)))
        .catch(error => this.handleError(error));
    }else{
      header = this.addAuthorization(header);
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
      localStorage.removeItem("authorization");
      this.router.navigate(["/login"]);
    }
    layer.msg(msg, {icon: 2}); // 由这里统一处理error,不需要每次都catch
    console.log(errorResponse,msg);
  }

  private addAuthorization(header: HttpHeaders){
    let authorization = this.commonUtil.getAuthorization();
    if(this.commonUtil.isNull(authorization)){
      return header;
    }
    return new HttpHeaders({'Content-Type': header.get('Content-Type'), 'Authorization': 'bearer ' + this.commonUtil.getAuthorization().access_token});
  }

  /**
   * 该版为微服务架构，由于没有写一个统一业务平台，直接请求到中台服务网关
   * 后续可直接替换为空字符
   * */
  private handlerUrl(servicePrefix: string, url: string){
    if(this.commonUtil.isNull(servicePrefix)){
      return url;
    }
    return servicePrefix + "/" + url;
  }
}

