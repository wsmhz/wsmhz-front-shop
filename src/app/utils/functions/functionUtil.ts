declare let $: any;

/**
 *  bootstrap 分页插件
 * @param {number} currentPage 当前页
 * @param {number} totalPages 总页数。
 * @param {number} numberOfPages 下栏页码个数
 * @param {Function} pageClick  点击回调函数
 */
export function PageLimit(currentPage:number,totalPages:number,numberOfPages:number,pageClick:Function){
  return $('#pageLimit').bootstrapPaginator({
    currentPage: currentPage,//当前的请求页面。
    totalPages: totalPages,//一共多少页。
    size:"normal",//页眉的大小。
    bootstrapMajorVersion: 3,//bootstrap的版本要求。
    alignment:"right",
    useBootstrapTooltip:true,
    numberOfPages:numberOfPages,//一页列出多少数据。
    bootstrapTooltipOptions: {
      container: true
    },
    onPageClicked: function(e,originalEvent,type,page){
      pageClick(page);
    },
    itemTexts: function (type, page, current) {
      switch (type) {
        case "first": return "<span style='cursor:pointer'>首页</span>";
        case "prev": return "<span style='cursor:pointer'>上一页</span>";
        case "next": return "<span style='cursor:pointer'>下一页</span>";
        case "last": return "<span style='cursor:pointer'>末页</span>";
        case "page": return "<span style='cursor:pointer'>"+page+"</span>";
      }
    }
  });
}
