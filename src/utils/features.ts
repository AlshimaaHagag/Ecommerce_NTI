// import {Request, Response} from 'express';
import mongoose from 'mongoose';

class Features {
  public paginationResults:any;
constructor(public mongooseQuery :mongoose.Query<any[],any>,private queryString:any) {}

    filter () {
       const queryStringObj: any = {...this.queryString};
       const executedFields :string[] = ['page', 'limit', 'sort', 'fields', 'search', 'lang'];
       executedFields.forEach((field:string ):void =>{
           delete queryStringObj[field]
        });

let queryStr:string=JSON.stringify(queryStringObj);
queryStr =queryStr.replace(/\b(gte|gt|lte|lt)\b/g ,match => `$${match}`);
    this.mongooseQuery= this.mongooseQuery.find(JSON.parse(queryStr));
    return this;

      };
       sort(){
if(this.queryString.sort) {
    const sortBy = this.queryString.sort.split(',').join(' ');
    this.mongooseQuery.sort(sortBy);
}
else this.mongooseQuery.sort('-createdAt')
          return this;
}

   limitFields(){
if(this.queryString.fields) {
    const fields = this.queryString.fields.split(',').join(' ');
    this.mongooseQuery.select(fields);
}else this.mongooseQuery.select('-__v');
return this;

}

   search(modelName:string){

    if (this.queryString.search) {
        let query:any={};
        if (modelName === 'products') {
            query = {
                $or: [
                    {name: new RegExp(this.queryString.search, 'i')},
                    {description: new RegExp(this.queryString.search, 'i')}

                ]
            };
    }else {
        query={name:new RegExp(this.queryString.search,'i')};
        }
        this.mongooseQuery=this.mongooseQuery.find(query);
    }
    return this;
      }


      paginate(documentCount:number){

    const page = this.queryString.page *1 || 1;
const limit = this.queryString.limit *1 || 20;
const skip = (page -1) * limit;
const endIndex = page * limit;
const startIndex = endIndex - limit;
const pagination:any = {};
pagination.currentPage = page;
pagination.limit = limit;
pagination.totalPages = Math.ceil(documentCount / limit);
pagination.totalDocuments = documentCount;

if (endIndex < documentCount)
{
    pagination.next=Number(page)+1;
}
if (skip>0){
    pagination.prev=Number(page)-1;
}
this.mongooseQuery=this.mongooseQuery.skip(skip).limit(limit);
this.paginationResults=pagination;
    return this;

      }


}


export default Features;