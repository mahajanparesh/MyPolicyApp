export interface Card {
  cardNumber: string;
  cardOwnerName: string;
  id: number;
  securityCode: string;
  userId: number;
  validThrough: string;
}
export interface CardDetails {
  cardOwnerName: string;
  cardNumber: string;
  securityCode: string;
  validThrough: string;
  userId: number;
}
