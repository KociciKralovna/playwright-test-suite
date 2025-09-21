import { test, expect, request } from '@playwright/test';
import { books } from '../data/books';
import { expectOrSkip } from '../utils/apiHelpers';

test('GET /isbn/{isbn} return book details', async ({ }, testInfo) => {
    const context = await request.newContext();

    const isbn = books.hungerGames.isbn10;
    const expectedTitle = books.hungerGames.expectedTitle;
    const expectedAuthorKey = books.hungerGames.expectedAuthorKey;

    const response = await context.get(`https://openlibrary.org/isbn/${isbn}.json`);

    await expectOrSkip(response);

    const data = await response.json();

    expect(data.title).toBe(expectedTitle);
    expect(data.publish_date).toBeTruthy();
    expect(Array.isArray(data.authors)).toBe(true);
    expect(data.authors[0].key).toBe(expectedAuthorKey);
});

test ('GET /books/{olid} return book details', async () => {
    
    const context = await request.newContext();
    
    const olid = books.hungerGames.olid
    const olidKey = books.hungerGames.olidKey;
    const expectedTitle = books.hungerGames.expectedTitle;
    const expectedAuthor = books.hungerGames.expectedAuthorKey;
    const expectedPublisher = books.hungerGames.expectedPublisher;
     

    const response = await context.get(`https://openlibrary.org/books/${olid}.json`);
    
    await expectOrSkip(response);
    
    const data = await response.json();

    expect(data.title).toBe(expectedTitle);
    expect(data.publishers).toContain(expectedPublisher);
    expect(data.key).toBe(olidKey);
    expect(Array.isArray(data.authors)).toBe(true);
    expect(data.authors[0].key).toBe(expectedAuthor);

});