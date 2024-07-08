export interface CheckInBookData {
  last_name: string;
  first_name: string;
  middle_name?: string;
  passport_details: string;
  room: string;
  check_in_date: Date;
  check_out_date: Date;
  comment: string;
  note: string;
}
