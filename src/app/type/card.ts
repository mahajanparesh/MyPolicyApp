export interface Card {
  cardNumber: string;
  cardOwnerName: string;
  id: number;
  securityCode: string;
  userId: number;
  validThrough: string; // You can use Date type if you prefer
}
