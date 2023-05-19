export interface IState {
    scene_name : string, 
    character1 : string, 
    character2 : string,
}

export interface Iprops {
    handleClose : ()=> void , 
    change : ()=> void , 
    module_id : string
}
