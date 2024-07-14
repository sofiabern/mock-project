export interface Client {
  _id: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  passport_details: string;
  comment?: string;
  visitsAmount: number;
  discounts: {
    regularCustomer: number;
    military: number;
    guardian: number;

  }
  totalDiscount: number;
}

export interface RoomApiResponse {
  status: number;
  message: string;
  data: Client[];
}
