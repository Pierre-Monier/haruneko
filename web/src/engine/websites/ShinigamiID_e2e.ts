﻿import { TestFixture, type Config } from '../../../test/WebsitesFixture';

const config: Config = {
    plugin: {
        id: 'shinigamiid',
        title: 'Shinigami ID',
    },
    container: {
        url: 'https://shinigami.sh/series/sss-class-suicide-hunter/',
        id: JSON.stringify({ post: "641", slug: "/series/sss-class-suicide-hunter/" }),
        title: 'SSS-Class Suicide Hunter'
    },
    child: {
        id: '/series/sss-class-suicide-hunter/chapter-01/',
        title: 'Chapter 01'
    },
    entry: {
        index: 1,
        size: 879_639, //or 894_830
        type: 'image/jpeg'
    }
};

const fixture = new TestFixture(config);
describe(fixture.Name, () => fixture.AssertWebsite());