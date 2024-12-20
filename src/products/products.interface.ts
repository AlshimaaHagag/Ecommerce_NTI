import {Document} from 'mongoose';
import CategoriesService from "../categories/categories.service";
import {Categories} from "../categories/categories.interface";
import {Subcategories} from "../subcategories/subcategories.interface";
export interface Products extends Document {
    // key :datatype
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly subcategory:Subcategories;
    readonly quantity: number;
    readonly  discount: number;
    readonly  product_image: string;
    readonly  priceAfterDiscount: number;
    readonly  discountPercentage: number;
    readonly  sold: number;
    readonly  rateAvg: number;
    readonly  rating: number;
    cover :string;
    readonly category:Categories;
    images :string[];
}
