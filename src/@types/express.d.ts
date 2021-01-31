// E possivel acessar id de user e varios locais e também e necessaria pra

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
