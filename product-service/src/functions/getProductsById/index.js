import products from '../../db/productList.json';

const response = (products = {}, status = 200) => ({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
    },
    statusCode: status,
    body: JSON.stringify(products)
});

export const handler = async event => {
    const {productId} = event.pathParameters;
    const product = await products.find(({id}) => id === productId);

    if (!product) {
        return response({
            message: "Product not found, available ids (2201-2205)."
        });
    }
    return response({product}, 200);
};