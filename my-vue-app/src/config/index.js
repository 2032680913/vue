//当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvCofig ={
    development:{
        baseApi:'/api',
        mockApi:'https://',
    },
    test:{
        baseApi:'/api',
        mockApi:'https://',
    },
    pro:{
        baseApi:'/api',
        mockApi:'https://',
    },

}
export default{
    env,
    mock:true,
    ...EnvCofig[env]
}