﻿import { TestFixture } from '../../../test/WebsitesFixture';

const config = {
    plugin: {
        id: 'serimanga',
        title: 'Seri Manga'
    },
    container: {
        url: 'https://serimanga.com/manga/kara-yonca',
        id: '/manga/kara-yonca',
        title: 'Black Clover'
    },
    child: {
        id: '/manga/kara-yonca/277',
        title: 'Bölüm 277: Yaban Güllerinin Kraliçesi'
    },
    entry: {
        index: 0,
        size: 301_207,
        type: 'image/jpeg'
    }
};

const fixture = new TestFixture(config);
describe(fixture.Name, () => fixture.AssertWebsite());