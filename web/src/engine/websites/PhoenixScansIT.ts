import { Tags } from '../Tags';
import icon from './PhoenixScansIT.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as PizzaReader from './decorators/PizzaReader';
import * as Common from './decorators/Common';

@PizzaReader.MangaAJAX(/^{origin}\/comics\/[^/]+$/)
@PizzaReader.MangasSinglePageAJAX()
@PizzaReader.ChaptersSinglePageAJAX()
@PizzaReader.PagesSinglePageAJAX()
@Common.ImageAjax()

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('phoenixscans-it', `Phoenix Scans`, 'https://www.phoenixscans.com', Tags.Language.Italian, Tags.Media.Manga, Tags.Source.Scanlator);
    }

    public override get Icon() {
        return icon;
    }
}