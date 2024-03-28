import axios from 'axios'
import config from '../config'
import  {ElMessage} from 'element-plus'
const NetWork_ERROR="网络请求异常，请稍后"
//创建一个axios实例

const service = axios.create({
    baseURL:config.baseApi
})
//在请求之前做一些事情

service.interceptors.request.use((req)=>{
    //可以自定义header
    return req
})
//在请求之后做一些事情
service.interceptors.response.use((res)=>{
    const {code ,data,msg} = res.data
    if(code == 200){
        return data
    }else{
        //网络请求错误
        ElMessage.error(msg || NetWork_ERROR)
        return Promise.reject(msg || NetWork_ERRO)
    }

})

//封装核心函数
function request(options) {
    options.method = options.method || 'get'
    if(options.method.toLowerCase() == 'get'){
        options.params = options.data
    }
    //对mock的处理
    let isMock = config.isMock
    if(typeof options.mock !=='undefined'){
    isMock = options.mock
    }
    
    //对线上环境做处理
    if(config.env == 'prod'){
        service.defaults.baseURL = confog.baseApi
    }else{
        service.defaults.baseURL = isMock ? config.mockApi:config.baseApi;
    }
     return service(options)
}
export default request
