<script lang="ts">
    import type {
        IMediaContainer,
        IMediaChild,
    } from "../../../engine/providers/MediaPlugin";
    import { Loading } from "carbon-components-svelte";
    import WideViewerImage from "./WideViewerImage.svelte";
    import { onMount } from "svelte";
    import { preloadImage } from "../utils/image";
    import {
        inversedReading,
        doublePage,
        mangaViewerTransition,
        horizontalMargin,
        verticalMargin,
    } from "../utils/settings";

    type ChapterImages = { src: string; nextSrc: string | undefined };

    export let item: IMediaContainer;
    export let throttlingDelay: number;
    export let currentImageIndex: number;

    let chapterImages: Promise<ChapterImages[]> = getChapterImages();

    // We must return a totalPaginationPixels based on the reading flow
    function readingPaginationFactor(bool: boolean, input: number): number {
        return bool ? input : -input;
    }

    $: totalPaginationPixels = 1 * paginationFactor;
    $: offset =
        currentImageIndex *
        readingPaginationFactor($inversedReading, totalPaginationPixels);

    let paginationFactor: number;

    function setPaginationFactor() {
        paginationFactor = nw.Window.get().width;
    }

    function handleKeyDown(evt: KeyboardEvent) {
        if (
            (!$inversedReading && evt.key === "ArrowRight") ||
            ($inversedReading && evt.key === "ArrowLeft")
        ) {
            nextImage();
        } else if (
            (!$inversedReading && evt.key === "ArrowLeft") ||
            ($inversedReading && evt.key === "ArrowRight")
        ) {
            previousImage();
        }
    }

    async function nextImage() {
        const imagesLenght = (await chapterImages).length;
        if (imagesLenght && currentImageIndex < imagesLenght - 1) {
            currentImageIndex += 1;
        }
    }

    function previousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex -= 1;
        }
    }

    async function getImages(
        entries: IMediaChild[]
    ): Promise<Promise<HTMLImageElement>[]> {
        return entries.map(async (entrie, index) => {
            const delay = throttlingDelay * index;
            await preloadImage(entrie.SourceURL, delay);

            const img = new Image();
            img.src = entrie.SourceURL;

            return img;
        });
    }

    async function awaitImages(
        images: Promise<HTMLImageElement>[]
    ): Promise<HTMLImageElement[]> {
        const awaitedImages: HTMLImageElement[] = [];

        for (const image of images) {
            const awaitedImage = await image;
            awaitedImages.push(awaitedImage);
        }

        return awaitedImages;
    }

    function convertImagesToChapterImages(
        images: HTMLImageElement[]
    ): ChapterImages[] {
        const chapterImages: ChapterImages[] = [];
        let i = 0;

        while (i < images.length) {
            let nextSrc: string | undefined = undefined;

            // should display two image
            if (
                $doublePage &&
                images[i] &&
                images[i].width < images[i].height &&
                images[i + 1] &&
                images[i + 1].width < images[i + 1].height
            ) {
                nextSrc = images[i + 1].src;
            }

            const chapterImage = {
                src: images[i].src,
                nextSrc,
            };

            chapterImages.push(chapterImage);

            if (chapterImage.nextSrc) {
                // because we already process the i+1 image
                i += 2;

                // make the currentImageIndex match the chapterImages data
                if (currentImageIndex >= chapterImages.length) {
                    currentImageIndex--;
                }
            } else {
                i++;
            }
        }

        return chapterImages;
    }

    // Convert URLs to a useful data structure
    async function getChapterImages(): Promise<ChapterImages[]> {
        const promiseImages = await getImages(item.Entries);

        // We await all promises to have an HTMLImageElement[] instead of Promise<HTMLImageElement>[]
        const images = await awaitImages(promiseImages);

        return convertImagesToChapterImages(images);
    }

    onMount(() => {
        setPaginationFactor();
    });
</script>

<svelte:window
    on:keydown={(evt) => handleKeyDown(evt)}
    on:resize={() => setPaginationFactor()}
/>

{#await chapterImages}
    <Loading description="Loading images" />
{:then chapterImages}
    <div
        class={$inversedReading && $mangaViewerTransition
            ? "is-inversed transition container"
            : $inversedReading
            ? "is-inversed container"
            : "container"}
        style="transform: translateX({offset}px)"
    >
        {#each chapterImages as chapterImage}
            {#if chapterImage.nextSrc !== undefined}
                <div
                    style="min-width: {paginationFactor}px;"
                    class:is-inversed={$inversedReading}
                >
                    <WideViewerImage
                        alt="content_{currentImageIndex}"
                        src={chapterImage.src}
                        class="manga-image double-page-image"
                        style="padding: {$verticalMargin}px {$horizontalMargin /
                            2}px;"
                        {throttlingDelay}
                    />
                    <WideViewerImage
                        alt="content_{currentImageIndex}"
                        src={chapterImage.nextSrc}
                        class="manga-image double-page-image"
                        style="padding: {$verticalMargin}px {$horizontalMargin /
                            2}px;"
                        {throttlingDelay}
                    />
                </div>
            {:else}
                <div style="min-width: {paginationFactor}px;">
                    <WideViewerImage
                        alt="content_{currentImageIndex}"
                        src={chapterImage.src}
                        class="manga-image"
                        style="padding: {$verticalMargin}px {$horizontalMargin}px;"
                        {throttlingDelay}
                    />
                </div>
            {/if}
        {/each}
    </div>
{:catch error}
    <p style="color: red">{error}</p>
{/await}

<style>
    .container {
        width: 100%;
    }

    .transition {
        transition: transform 0.4s ease-in-out;
    }

    div {
        height: 100%;
        display: flex;
    }

    .is-inversed {
        flex-flow: row-reverse;
    }
</style>
