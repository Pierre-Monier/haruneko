<script lang="ts">
    import type { IMediaContainer } from "../../../engine/providers/MediaPlugin";
    import WideViewerImage from "./WideViewerImage.svelte";
    import { horizontalMargin, verticalMargin } from "../utils/settings";

    export let item: IMediaContainer;
    export let throttlingDelay: number;
</script>

{#each item.Entries as content, index}
    <WideViewerImage
        alt="content_{index}"
        src={content.SourceURL}
        style="padding: {$verticalMargin / 2}px {$horizontalMargin}px;"
        throttlingDelay={throttlingDelay * index}
    />
{/each}

<style>
</style>
