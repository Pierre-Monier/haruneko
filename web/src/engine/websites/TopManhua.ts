import { Tags } from '../Tags';
import icon from './TopManhua.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

@Madara.MangaCSS(/^{origin}\/manhua\/[^/]+\/$/, 'meta[property="og:title"]:not([content*="Top Manhua"])')
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageAJAXv2()
@Madara.PagesSinglePageCSS()
@Common.ImageAjax()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('topmanhua', 'Top Manhua', 'https://www.topmanhua.com', Tags.Media.Manhua, Tags.Media.Manhua, Tags.Language.English);
    }

    public override get Icon() {
        return icon;
    }
}