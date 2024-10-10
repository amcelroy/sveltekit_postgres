<script lang="ts">
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";

    export let name;

    export let path: any[] = [];

    export let menu: any[] = [];
</script>

<div class="p-4 top-0 border-b w-full">
    <Breadcrumb.Root>
        <Breadcrumb.List>
            {#each path as item, i}
                <Breadcrumb.Item>
                    <Breadcrumb.Link href={item.href}>{item.name}</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
            {/each}
            {#each menu as item, i}
                <Breadcrumb.Item>
                    <Breadcrumb.Link href={item.href}>{item.name}</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
            {/each}
            <Breadcrumb.Item>
                <Breadcrumb.Page>{name}</Breadcrumb.Page>
            </Breadcrumb.Item>
        </Breadcrumb.List>
    </Breadcrumb.Root>
</div>  
<div class="p-4 m-4">
    <slot></slot>
</div>  