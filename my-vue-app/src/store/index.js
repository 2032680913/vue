import {createStore} from "vuex";
export default createStore({
    state:{
        isCollapse:true,
        currentMenu:null,
        tagList:[
            {
                name:'home',
                path:'/',
                label:'首页',
                icon:'home'
            }
        ]
    },
    mutations:{
        updateCollapse(state,payload){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            // val.name=='home'?(state.currentMenu=null):(state.currentMenu = val)
            if(val.name=='home'){
                state.currentMenu=null
            }else{
                state.currentMenu = val
                let result = state.tagList.findIndex(item=>item.name ==val.name);
                result==-1? state.tagList.push(val):''

            }
        },
        selectTag(state,val){
           let tag = state.tagList.findIndex(item=>item.name == val.name);
            state.tagList.splice(tag,1)
        }
    }
})