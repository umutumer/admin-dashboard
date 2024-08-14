export interface Product{
    id:number,
    name:string,
    base64Image:string,
    explanation:string,
    price:number
}
export interface User{
    id: number,
    username: string,
    mail: string,
    password: string
}
export interface Order{
    id: number,
    username: string,
    productName: string,
    status: string
}