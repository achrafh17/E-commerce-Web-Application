export interface Product {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  reference?: string | null;
  imageUrl?: string | null;
  images: string[];
  stock: number;
  created_at: string;
  update_at: string;
  ownerId: number;
  category: string;
  ownerName: string;
  favoritedBy: any;
}
