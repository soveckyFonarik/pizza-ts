export interface PizzaCart {
  name: string;
  price: number;
  id: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface CartState {
  totalPrice: number;
  items: PizzaCart[];
}
