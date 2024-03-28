
import request from "./request"
export default {
 //
 getTableData(){
    return request({
        url:'/home/getTableData',
        methods:'get',
        data:URLSearchParams,
        mock:true,

    }

    )
 }
}