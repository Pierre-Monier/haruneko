// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './mkzhan.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('mkzhan', `mkzhan`, 'https://www.mkzhan.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class mkzhan extends MH {

    constructor() {
        super();
        super.id = 'mkzhan';
        super.label = 'mkzhan';
        this.tags = [ 'manga', 'webtoon', 'chinese' ];
        this.url = 'https://www.mkzhan.com';

        this.path = '/category/?page=%PAGE%';
        this.queryMangasPageCount = 'div#Pagination a:nth-last-child(2)';
        this.queryMangas = 'div.cate-comic-list div.common-comic-item a.cover';
        this.queryChapter = 'a.j-chapter-link';
        this.queryMangaTitle = 'div.de-info__box p.comic-title ';
        this.queryPages = 'div.rd-article-wr div.rd-article__pic source';
    }

    async _getChapters(manga) {
        let request = new Request(new URL(manga.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, this.queryChapter);
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element.dataset.hreflink, this.url),
                title: element.textContent.trim()
            };
        });
    }
}
*/