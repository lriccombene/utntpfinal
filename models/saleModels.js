const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage")

const ventaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "productss"
    },
    price: {
      type: Number,
      min: [1,errorMessage.GENERAL.minlength],
      required: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    price_offer: {
      type: Number,
      min: [1,errorMessage.GENERAL.minlength],
      required: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    amount: {
      type: Number,
      min: [1,errorMessage.GENERAL.minlength],
      required: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    name: String,
    payment:{
      amount:Number,
      method:String,
      status:String,
      expirationDateTo:Date,
    }


});
//const now= new Date();
//const expirationDay = 2
//const expirationDateTo = new Date(now.setDate(now.getDate() + expirationDay ));

ventaSchema.statics.findBydIdAndValidate = async function(id){
    const document = await this.findById(id);
    if(!document){
        return{
            error:true,
            message:"No existe venta"
        }

    }
    return document;
}

ventaSchema.set('toJSON', { getters: true, virtuals: true });
module.exports = mongoose.model("venta", ventaSchema)
