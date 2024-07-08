export interface CheckIn {
  _id: string;
  client: {
    first_name: string;
    middle_name: string;
    last_name: string;
  };
  room: {
    room_number: number;
  };
  check_in_date: string;
  check_out_date: string;
  note: string;
  isCheckIn: boolean;
}
