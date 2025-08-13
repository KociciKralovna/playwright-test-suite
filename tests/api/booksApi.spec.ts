import { test, expect, request } from '@playwright/test';
import { books } from '../data/books.ts';

test ('GET /isbn/{isbn} return book details', async () => {

    const context = await request.newContext();

    const isbn = books.hungerGames.isbn10;
    const expectedTitle = books.hungerGames.expectedTitle;
    const expectedAuthorKey = books.hungerGames.expectedAuthorKey;

    const respons = await context.get('https://openlibrary.org/isbn/{isbn}.json');
    expect(respons.status()).toBe(200);

    const data = await respons.json();

    expect(data.title).toBe(expectedTitle);
    expect(data.publish_date).toBeTruthy;
    expect(Array.isArray(data.authors)).toBe(true);
    expect(data.authors[0].key).toBe(expectedAuthorKey);
});