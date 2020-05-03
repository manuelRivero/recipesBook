import { Ingredients } from './../ingredients.model/ingredients.model';
export class Recipe{
    constructor(
        public name:string,
        public description:string,
        public instructions:[{description:string}],
        public imgpath:string,
        public ingredients:Ingredients[],
        public _id:string
    ){ }
}
