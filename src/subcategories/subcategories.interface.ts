import {Document} from 'mongoose';
import CategoriesService from "../categories/categories.service";
import {Categories} from "../categories/categories.interface";
export interface Subcategories extends Document {
    // key :datatype
    readonly name: string;
    readonly category:Categories;
    image :string;
}