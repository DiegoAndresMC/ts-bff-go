interface IProduct {
  _id: string;
  id: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  isPalindrome?: boolean;
  calculatedPrice?: number;
}

export class Product {
  // private product: IProduct;
  private readonly _id: string;
  private readonly id: string;
  private readonly brand: string;
  private readonly description: string;
  private readonly image: string;
  private readonly price: number;
  private readonly isPalindrome?: boolean;
  private readonly calculatedPrice?: number;
  constructor(p: Record<any, any>) {
    this._id = p._id;
    this.id = p.id;
    this.brand = p.brand;
    this.description = p.description;
    this.image = p.image;
    this.price = p.price;
    this.isPalindrome = p.isPalindrome;
    this.calculatedPrice = p.calculatedPrice;
  }

  public make(): IProduct {
    return {
      _id: this._id,
      id: this.id,
      brand: this.brand,
      description: this.description,
      image: this.image,
      price: this.price,
      isPalindrome: this.isPalindrome ?? false,
      calculatedPrice: this.calculatedPrice,
    };
  }
}

export class Params {
  searchText?: string;
  id?: string;
}
