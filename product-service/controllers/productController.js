const poolPromise = require('../config/poolPromise')
const { product } = require('../config/config')

module.exports = {
    createProduct: async(req, res) => {
        let { product_name, price, description, category, product_image } = req.body
        try {
            let pool = await poolPromise()
            pool.request()

            .input('product_name', product_name)
                .input('price', price)
                .input('description', description)
                .input('category', category)
                .input('product_image', product_image)

            .input('StatementType', 'Insert')
                .execute('dbo.product_queries')

            .then(results => {
                if (results.rowsAffected) {
                    res.send("Product successfuly created!")
                    console.log("Product successfuly created!!")
                }
            })
        } catch (err) {
            console.log(err.message)

        }
    },

    updateProduct: async(req, res) => {
        let { product_name, price, description, category, product_image } = req.body
        try {
            let pool = await poolPromise()
            pool.request()

            .input('product_name', product_name)
                .input('price', price)
                .input('description', description)
                .input('category', category)
                .input('product_image', product_image)
                .input('StatementType', 'Update')

            .execute('dbo.product_queries')

            .then(results => {
                if (results.rowsAffected) {
                    res.send("Product successfuly updated!")
                    console.log("Product successfuly updated!!")
                }
            })
        } catch (err) {
            console.log(err.message)

        }
    },
    getProduct: async(req, res) => {
        let { product_name } = req.params

        try {
            let pool = await poolPromise()
            let result = pool.query(`select * from products where product_name='${product_name}'`).then(results => {
                console.log(results.recordset)
                res.json({
                    status: 200,
                    success: true,
                    message: "The product is: ",
                    results: results.recordset
                })
            })
        } catch (err) {
            console.log(err.message)

        }
    },
   
        viewProducts: async (req, res) => {
                      
            let pool = await poolPromise()
            
            pool.query(`select * from products`).then((results) => {
              if (results.recordset) {
                return res.status(200).json({
                  status: 200,
                  success: true,
                  message: 'These are all the products',
                  results: results.recordset,
                });
              }
              res.status(404).json({
                status: 404,
                success: false,
                message: 'There are no products to view',
                results: {},
              });
            });
          },
          productPagination: async (req, res) => {
            
            try {
            
                let pool = await poolPromise()
                const result=await pool.request()
                .input('row_count',req.query.row_count)
                .input('page_number',req.query.page_number)
                .execute(`product_pagination`)
                const products=result.recordset;
        
               
                    res.json(products)
                } catch (err) {
                    res.status(500)
        
                }
            },
          searchProduct: async (req, res) => {

         try {
           
            
             let pool = await poolPromise()
             const result=await pool.request()
             .input('product_name',req.query.product_name)
             .execute(`SearchProduct`)
             const products=result.recordset;

            
                 res.json(products)
            
         } catch (err) {
             res.status(500)

         }
     },
    deleteProduct: async(req, res) => {

        let { product_name } = req.params

        try {
            let pool = await poolPromise()
                /*pool.query(`select * from products where product_name='${product_name}'`).then(results => {
                    console.log(results.recordset)
                    res.json({
                        status: 200,
                        success: true,
                        message: "The product is Deleted",
                        results: results.recordset
                    })
                })*/

            /* pool.request()

                 .emit('product_name', product_name)


                 .emit('StatementType', 'Delete')
                 .execute('dbo.product_queries')*/
        } catch (err) {
            console.log(err.message)

        }
    }
}