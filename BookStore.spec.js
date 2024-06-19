const { test, expect } = require('@playwright/test');
import { UtilMethods } from './UtilMethods';

const methods = new UtilMethods();
let token;

const baseURL = "https://simple-books-api.glitch.me";

test("GetStatus", async ({ request }) => {

    const response = await request.get(baseURL + "/status");
    const respBody = JSON.parse(await response.text());
    const body_status = JSON.stringify(respBody.status);
    expect(await response.status()).toBe(200);
    expect(await body_status == "OK");
})

test("Get all books", async ({ request }) => {

    const response = await request.get(baseURL + "/books");
    const respBody = JSON.parse(await response.text());
    const firstBookObj = await respBody[0];

    expect(await response.status()).toBe(200);
    expect(await firstBookObj.name).toBe("The Russian");
    expect(await firstBookObj.type).toBe("fiction");
})


test("Get book by ID", async ({ request }) => {

    const response = await request.get(baseURL + "/books/2");
    const respBody = JSON.parse(await response.text());
    const author = respBody.author;

    expect(await response.status()).toBe(200);
    expect(await author).toBe("Cicely Tyson");
});

test("authentication and getting token", async ({ request }) => {

    const email = await methods.createMail();
    const response = await request.post(baseURL + "/api-clients/",
        {
            data: { clientName: "zika", clientEmail: "mymail" + email },
            headers: { "Accept": "application/json" }
        });
    const respBody = JSON.parse(await response.text());
    token = respBody.accessToken;

    expect(await response.status()).toBe(201);
    expect(await token).toBeTruthy();
});

test("Order the book", async ({ request }) => {

    const response = await request.post(baseURL + "/orders",
        {
            data: { bookId: 1, customerName: "marko" },
            headers: {
                "Authorization": "Bearer " + String(token),
                "Accept": "application/json"
            }
        });

    const respBody = JSON.parse(await response.text());
    console.log(respBody);

    expect(await response.status()).toBe(201);
    expect(respBody.created).toBe(true);
});

