const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title: {
        type: String,
        required: true},
    description: String,
    image: {
        filename: String,url: {
        type:String,
        //for undefined used ->default when intially data saved in db from developer side
        default:"https://www.istockphoto.com/photos/beautiful-sunset",
        set: (v)=> v==="" ? "https://www.istockphoto.com/photos/beautiful-sunset" :v,  //ternary operation
    }
},
    price: Number,
    location: String,
    country: String

});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;