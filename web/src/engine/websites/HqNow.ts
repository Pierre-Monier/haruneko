import { Tags } from '../Tags';
import icon from './HqNow.webp';
import { Chapter, DecoratableMangaScraper, Manga, Page, type MangaPlugin } from '../providers/MangaPlugin';
import * as Common from './decorators/Common';
import { FetchGraphQL, FetchRequest } from '../FetchProvider';

type APIMangas = {
    getHqsByNameStartingLetter: APIManga[],
};

type APISingleManga = {
    getHqsById: APIManga[],
};

type APIManga = {
    id: number,
    name: string,
    capitulos: APIChapter[]
};

type APIChapter = {
    name: string,
    id: number,
    number: number
};

type APIPages = {
    getChapterById: {
        pictures: { pictureUrl: string }[]
    }
};

@Common.ImageAjax()

export default class extends DecoratableMangaScraper {

    private readonly apiUrl = 'https://admin.hq-now.com';

    public constructor() {
        super('hqnow', `Hq Now`, 'https://www.hq-now.com', Tags.Language.Spanish, Tags.Media.Comic, Tags.Source.Aggregator);
    }

    public override get Icon() {
        return icon;
    }

    public override ValidateMangaURL(url: string): boolean {
        return new RegExp(`^${this.URI.origin}/hq/[\\d]+`).test(url);
    }

    public override async FetchManga(provider: MangaPlugin, url: string): Promise<Manga> {
        const id = parseInt(new URL(url).pathname.match(/\/hq\/([\d]+)/)[1]);
        const operationName = 'getHqsById';
        const variables = {
            id: id
        };
        const query = `query getHqsById($id: Int!) {
                getHqsById(id: $id) {
                    id
                    name
                }
            }
           `;
        const request = new FetchRequest(new URL('/graphql', this.apiUrl).href);
        const data = await FetchGraphQL<APISingleManga>(request, operationName, query, JSON.stringify(variables));
        return new Manga(this, provider, String(id), data.getHqsById[0].name.trim());
    }

    public override async FetchMangas(provider: MangaPlugin): Promise<Manga[]> {
        const operationName = 'getHqsByNameStartingLetter';
        const variables = {
            letter: '0-z'
        };
        const query = `query getHqsByNameStartingLetter($letter: String!) {
                getHqsByNameStartingLetter(letter: $letter) {
                    id
                    name
                }
            }
        `;

        const request = new FetchRequest(new URL('/graphql', this.apiUrl).href);
        const data = await FetchGraphQL<APIMangas>(request, operationName, query, JSON.stringify(variables));
        return data.getHqsByNameStartingLetter.map(manga => new Manga(this, provider, String(manga.id), manga.name));

    }

    public override async FetchChapters(manga: Manga): Promise<Chapter[]> {
        const operationName = 'getHqsById';
        const variables = {
            id: parseInt(manga.Identifier)
        };
        const query = `query getHqsById($id: Int!) {
                getHqsById(id: $id) {
                    id
                    name
                    capitulos {
                        name
                        id
                        number
                    }
                }
            }
            `;

        const request = new FetchRequest(new URL('/graphql', this.apiUrl).href);
        const data = await FetchGraphQL<APISingleManga>(request, operationName, query, JSON.stringify(variables));
        return data.getHqsById[0].capitulos.map(chapter => {
            const name = chapter.name ? String(chapter.number) + ' : ' + chapter.name.trim() : String(chapter.number);
            return new Chapter(this, manga, String(chapter.id), name);
        });
    }

    public override async FetchPages(chapter: Chapter): Promise<Page[]> {
        const operationName = 'getChapterById';
        const variables = {
            chapterId: parseInt(chapter.Identifier)
        };
        const query = `query getChapterById($chapterId: Int!) {
                getChapterById(chapterId: $chapterId) {
                    name
                    number
                    pictures {
                        pictureUrl
                    }
                }
            }
`;
        const request = new FetchRequest(new URL('/graphql', this.apiUrl).href);
        const data = await FetchGraphQL<APIPages>(request, operationName, query, JSON.stringify(variables));
        return data.getChapterById.pictures.map(page => new Page(this, chapter, new URL(page.pictureUrl)));

    }

}