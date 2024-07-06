export interface Room {
  _id: string;
  room_number: number;
  capacity: number;
  comfort_level: string;
  price: number;
  bookings: Booking[];
}

export interface Booking {
  check_in_date: Date;
  check_out_date: Date;
}
