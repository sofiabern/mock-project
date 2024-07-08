export interface Room {
  _id: string;
  room_number: number;
  capacity: number;
  comfort_level: string;
  price: number;
  bookingsAndCheckIns: Booking[];
}

export interface Booking {
  _id: string;
  check_in_date: Date;
  check_out_date: Date;
}
