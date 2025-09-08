import { describe, it, expect } from 'vitest';
import { books } from '../../tests/data/books';

async function getResponse(url: string) {
  const res = await fetch(url);
  return {
    status: res.status,
    body: res.headers.get('content-type')?.includes('json')
      ? await res.json()
      : await res.text(),
  };
}

describe('GET /isbn/{isbn}', () => {
  it('returns book details for a valid ISBN', async () => {
    const isbn = books.hungerGames.isbn10;
    const expectedTitle = books.hungerGames.expectedTitle;
    const expectedAuthorKey = books.hungerGames.expectedAuthorKey;

    const { status, body } = await getResponse(`https://openlibrary.org/isbn/${isbn}.json`);

    expect(status).toBe(200);
    expect(body.title).toBe(expectedTitle);
    expect(body.publish_date).toBeTruthy();
    expect(Array.isArray(body.authors)).toBe(true);
    expect(body.authors[0].key).toBe(expectedAuthorKey);
  });

  it('returns 404 for a non-existing ISBN', async () => {
    const isbn = books.nonExist.isbn;

    const { status, body } = await getResponse(`https://openlibrary.org/isbn/${isbn}.json`);

    expect(status).toBe(404);
    expect(body).toBeTruthy();  
  });
});
