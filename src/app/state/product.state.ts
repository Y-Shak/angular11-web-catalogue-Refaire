//DONE  ici il faut creer l'enum qui contien les actions ProductActionTypes
//  puis creer l'inteface ActionEvent qui contient le type et le playload 
// explications :
// on va créer un type adéquat a notre situation 
// qui va contenir un string qui indique le type de l'action souhaité par le user
// => au lieu de faire un string mieux créer une enum pour eviter les pbs de saisie 
// et qui va contenir une data optionnelle ( selon besoin de la méthodes) 
// => gereralement ça sera la variable en paramettre de la méthode appelé

export enum GettersActionsOnProducts {
    GET_ALL_PRODUCTS = "[ class : product] : get all products ",
    GET_SELECTED_PRODUCTS = "[ class : product] : get selected products ",
    GET_AVAILABLE_PRODUCTS = "[ class : product] : get available products ",
    SEARCH_PRODUCTS = "[ class : product] : get search products by keyword ",
}
export enum SettersActionsOnProducts {

    SELECT_PRODUCT = "[ class : product] : select a product",
    DELETE_PRODUCT = "[ class : product] : delete a product",
    EDIT_PRODUCT = "[ class : product] : edit a product",
    ADD_PRODUCT = "[ class : product] : add a product"
}
export enum StatisticsActionsOnProducts {

    PRODUCT_DELETED = "[ class : product] :  product deleted",
    PRODUCT_EDIT = "[ class : product] : product edited",
    PRODUCT_ADD = "[ class : product] : product saved ",
    PRODUCT_SELECTED = "[ class : product] : product saved "
}

export interface ActionEvent {
    eventName: GettersActionsOnProducts | SettersActionsOnProducts | StatisticsActionsOnProducts,
    eventPlayload?: any
}



export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}
export interface AppDataState<T> {
    dataState?: DataStateEnum,
    data?: T,
    errorMessage?: string
}