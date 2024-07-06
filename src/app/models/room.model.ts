export interface Room {
  _id: string;
  room_number: number;
  capacity: number;
  comfort_level: string;
  price: number;
  bookings: Booking[];
}

export interface Booking {
  check_in_date: string;
  check_out_date: string;
}
