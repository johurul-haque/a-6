export type Product = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  frame: {
    material: string;
    shape: string;
  };
  lens_type: string;
  color: string;
  gender: string;
  temple_length: number;
  bridge_size: number;
  hinge_type: string;
};
