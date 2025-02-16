import { Tags } from '../Tags';
import icon from './ColoredManga.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

@Madara.MangaCSS(/^{origin}\/mangas\/[^/]+\/$/, 'meta[property="og:title"]:not([content*="Colored Manga"])')
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageAJAXv2()
@Madara.PagesSinglePageCSS()
@Common.ImageAjax()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('coloredmanga', 'Colored Manga', 'https://coloredmanga.com', Tags.Media.Manga, Tags.Language.English);
    }

    public override get Icon() {
        return icon;
    }
}