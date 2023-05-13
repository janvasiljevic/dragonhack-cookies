export interface IUATPayload {
  email: string;
  sub: string;
}

export interface IUAT extends IUATPayload {
  iat: number;
  exp: number;
}

export interface ExtractedUAT {
  email: string;
  userId: string;
}

export interface RequestWithUAT extends Request {
  user: ExtractedUAT;
}
