<script lang="ts">
    import type { IMediaContainer } from "../../../engine/providers/MediaPlugin";
    import { viewerMode } from "../utils/settings";
    import WideViewerSetting from "./WideViewerSetting.svelte";
    import WebtoonViewer from "./WebtoonViewer.svelte";
    import MangaViewer from "./MangaViewer.svelte";

    export let item: IMediaContainer;
    export let throttlingDelay: number;
    export let toggleThumbnailViewer: () => void;
    export let currentImageIndex: number;

    let imagePadding = 2;
    const title = item?.Parent?.Title ?? "unkown";
</script>

<div class={$viewerMode}>
    <WideViewerSetting {title} {toggleThumbnailViewer} />
    {#if $viewerMode === "vertical"}
        <WebtoonViewer {item} {throttlingDelay} />
    {:else if $viewerMode === "horizontal"}
        <MangaViewer {item} {currentImageIndex} {throttlingDelay} />
    {/if}
</div>

<style>
    div {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        overflow-y: scroll;
        z-index: 9000;
        background-color: var(--cds-ui-01);
    }

    .horizontal {
        display: flex;
        align-items: center;
        overflow: hidden;
    }
</style>
