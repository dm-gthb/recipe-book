export class Recipe {
  public name: string;
  public descripton: string;
  public imagePath: string;

  constructor(name: string, description: string, imagePath: string) {
    this.name = name;
    this.descripton = description;
    this.imagePath = imagePath;
  }
}
