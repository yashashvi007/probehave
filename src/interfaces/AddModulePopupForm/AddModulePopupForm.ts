export interface IState  {
    title : string , 
    sub_heading : string , 
    description : string,
    detailDescription : string , 
    language : string , 
    price : any , 
    module_image : any , 
    char1Image : any,
    char2Image : any
}

export interface Iprops {
    id : any ,
    userInfo : any , 
    changeState : any ,
    handleClose : ()=> void ,
    categories : [], 
    tags : [] , 
    editData : any
}

export interface category {
    _id : string , 
    name : string 
}

export interface tag {
    _id : string , 
    name : string 
}