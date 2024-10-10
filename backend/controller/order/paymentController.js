const stripe = require('../../config/stripe')

const userModel = require('../../models/userModel')

const paymentController = async (request,response)=>{
    try{
        const {cartItems} =request.body

        console.log("cartitems", cartItems)

        const user = await userModel.findone({_id : request.userId})

        const params={
             submit_type : 'pay',
             mode : "payment",
             payment_methode_types : ['card'],
             billing_address_collection : 'auto',
             shipping_options:[
                {
                    shipping_rate : 'shr_1Q7GODRov6wWo8AKBv9kbwNr'
                }
             ],
             customer_email : user.email,
             line_items : cartItems.map((item,index)=>{
                return{
                    price_data : {
                         currency : 'inr',
                         product_data : {
                             name : item.productId.productName,
                             images : item.productId.productImage,
                             metadata : {
                                productId: item.productId._id
                             }
                         },
                         unit_amount :item.productId.sellingPrice * 100
                    },
                    adjustable_quantity :{
                        enable :true,
                        minimum : 1
                    },
                    quantity : item.quantity
                }
             }),
             success_url : `${process.env.FRONTED_URL}/success`,
             cancel_url : `${process.env.FRONTED_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params)

        response.status(303).json(session)
    } catch(error){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })  
    }
}

module.exports = paymentController