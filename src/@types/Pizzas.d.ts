export interface Pizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
export interface PizzaBlockProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  // rating: number;
}

export interface PizzaState {
  pizzas: Pizza[];
  isLoading: boolean;
}
