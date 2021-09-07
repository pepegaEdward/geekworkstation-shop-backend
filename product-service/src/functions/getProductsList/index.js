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

export const handler = async event => response(products);