import { handleResponse } from "../../handlers/handleResponse";
import { ConnectDB, dbOptions } from "../../db/connection";

export const handler = async event => {
    console.log(event);
    const db = new ConnectDB(dbOptions);
    const client = await db.connect();

    try {
        const { title, description, price, count } = JSON.parse(event.body);
        const notAllParamsProvided = !title || !description || !price || !count;

        if (notAllParamsProvided) {
            return handleResponse({ message: "Probably not all data inserted"}, 400);
        }

        const hasCorrectTypes =
            [title, description].every(param => typeof param === 'string') &&
            [price, count].every(param => typeof param === 'number');

        if (!hasCorrectTypes) {
            return handleResponse({ message: "Incorrect parameters" }, 400);
        }

        await client.query('BEGIN');

        const insertProductsText =
            'insert into products(title, description, price) VALUES($1, $2, $3, $4) RETURNING id';
        const productsResponse = await client.query(insertProductsText, [title, description, price]);
        const { id: productId } = productsResponse.rows[0];

        const insertStocksText = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2)';
        await client.query(insertStocksText, [productId, count]);

        await client.query('COMMIT');

        const dataToResponse = {
            title,
            description,
            price,
            count,
            id: productId,
        };

        return handleResponse(dataToResponse);
    } catch (error) {
        await client.query('ROLLBACK');
        return handleResponse({ message: "Something went wrong" }, 500);
    } finally {
        await db.disconnect();
    }
};