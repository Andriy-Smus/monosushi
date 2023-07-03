export interface IOrderRequest {
  number: string;
  dateTime: string;
  email: string;
  at_time: string;
  comment: string;
  comment_kitchen: string;
  date: string;
  delivery_method: string;
  entrance: string;
  flat: string;
  house: string;
  name: string;
  no_call: boolean;
  number_devices: string;
  payment_method: string;
  phone: string;
  pickup_address: string;
  street: string;
  time: string;
}

export interface IOrderResponse extends IOrderRequest {
  id: number | string;
}
