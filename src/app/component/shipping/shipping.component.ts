import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonUtil} from "../../utils/commonUtil";
import {CommonConfig} from "../../config/commonConfig";
import {Shipping, ShippingService} from "../../service/shipping/shipping.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

declare var layer:any;
declare var $:any;
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
  providers:[
    ShippingService
  ]
})
export class ShippingComponent implements OnInit {

  shipping = new Shipping();
  shippingList = [];
  user = this.commonUtil.getUserInfo();
  shippingForm:FormGroup;
  insertFlag = true;

  @Output()
  shippingId:EventEmitter<number> = new EventEmitter();
  constructor(
    private commonUtil:CommonUtil,
    private commonConfig:CommonConfig,
    private shippingService:ShippingService,
    private router:Router
  ) {
    this.shippingForm = new FormBuilder().group({
      receiverName: ["", [Validators.required]],
      receiverMobile: ['', Validators.required],
      receiverAddress: ['', Validators.required]
    });
  }

  ngOnInit() {
    $("#distpicker").distpicker({
      autoSelect: true
    });

    this.initList();
  }

  initList(){
    this.shippingService.selectAll()
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
            this.shippingList = res.data;
            if( ! this.commonUtil.isNull(res.data[0])){
              this.shippingId.emit(res.data[0].id); //发射
            }
            //active
            setTimeout(()=>{
              $("#address0").addClass("active");
            }, 500);
        }
      });
  }

  save(){
    if(this.shippingForm.valid){
      if(this.commonUtil.isNull(this.user.id)){
        this.router.navigate(['/login']);
      }else{
        this.shipping.userId = this.user.id;
        if(this.insertFlag){
          this.shippingService.insert(this.shipping)
            .then(res => {
              if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                this.initList();
                $("#addressModal").modal("hide");
              }
            });
        }else{
          this.shippingService.update(this.shipping)
            .then(res => {
              if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
                this.initList();
                $("#addressModal").modal("hide");
              }
            });
        }
      }
    }
  }

  choose(index:number,id:number){
    $(".address-item").removeClass('active');
    $("#address"+index).addClass("active");
    this.shippingId.emit(id); //发射
  }

  add(){
    this.shipping = new Shipping();
    $("#addressModal").modal("show");
    this.insertFlag = true;
  }

  update(id:number){
    this.shippingService.select(id)
      .then(res => {
        if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
          // $("#distpicker").distpicker({
          //   province: "浙江省",
          //   city: "杭州市",
          //   district: "西湖区"
          // });
          // $("#province").find("option[text='浙江省']").attr("selected",true);
          // $("#city").find("option[text='杭州市']").attr("selected",true);
          // $("#province").val("北京市");
          // $("#city").val(this.shipping.receiverCity);
          // $("#district").val(this.shipping.receiverDistrict);
          this.shipping = res.data;
          $("#addressModal").modal("show");
          this.insertFlag = false;
        }
      });
  }

  delete(id:number){
    layer.msg('确定删除吗？', {
      time: 0 //不自动关闭
      ,btn: ['确定', '取消']
      ,yes: (index)=>{
        layer.close(index);
        this.shippingService.delete(id)
          .then(res => {
            if(res.status === this.commonConfig.RESPONSE_CODE.SUCCESS){
              this.initList();
            }
          });
      }
    });
  }

}
