export const SECRET_KEY = "example";
export const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', "Декабрь"];
export const ERRORS = {
    NO_USER: { error: "There's no such user" },
    NO_BODY: { error: "No payload" },
    BAD_JSON: { error: "Bad JSON" },
    WRONG_JWT: { error: "Unauthorizated"},
}

//  FlowerTypes:
//  Dried: 0;
//  Fresh: 1;
//  Live: 2;
//  Vases: 3;
//  Candles: 4;
//  Refreshers: 5;

export interface IUserRegisterData {
    email: string,
    login: string,
    pass: string
}

export interface IJSONUser extends JSON {
    username: string;
    pass: string;
  }

export interface IGetPosts {
    id?: number
}

export interface IProductQuery {
    id?: number;
    name?:     string;
    cardImageUrl?: string;
    price?: number;
    images?: string;
    description?: string;
    flowersType?: number;
}

export interface ICreateUser {
    id?: number;
    name: string;
    cardImageUrl: string;
    images: string;
    price: number;
    description: string;
    flowersType: number;
}

export interface IUserJWT {
    jwt: string;
    id?: string;
}