import { handleResponse } from "../../handlers/handleResponse";
import { ConnectDB } from "../../db/connection";

export const handler = async event => {
    console.log(event);
    console.log(handler);
    const db = new ConnectDB();
    try {
        const client = await db.connect();
        const { rows } = await client.query(
            `select products.*, stocks.count from products inner join stocks on products.id = stocks.product_id`,
        );

        return handleResponse(rows);
    } catch (error) {
        return handleResponse({ message: error.message }, 500);
    } finally {
        await db.disconnect();
    }
};