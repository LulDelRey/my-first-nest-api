export default class Product {
  constructor(private id: string, private title: string, private description: string, private price: number) { }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    this.price = price;
  }

}
