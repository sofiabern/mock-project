export interface CheckInBookData {
  last_name: string;
  first_name: string;
  middle_name?: string;
  passport_details: string;
  room: string;
  isCheckIn: boolean;
  check_in_date: Date;
  check_out_date: Date;
  discounts: {
    regularCustomer: number;
    military: number;
    guardian: number;

  },
  totalDiscount: number;
  totalDayPrice: number;
  totalPrice: number;
  comment?: string;
  note?: string;
}
