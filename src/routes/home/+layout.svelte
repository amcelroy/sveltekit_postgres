<script lang="ts">
    import "../../app.css";
    import Icon from '@iconify/svelte';
</script>

<div class="flex flex-row">
    <aside style="fixed top-0 left-0 flex-shrink" aria-label="Sidenav">
        <div class="group flex flex-col justify-between py-5 px-1 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-screen">
            <div class="">
                <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/home">
                    <Icon icon="hugeicons:house-01" style="font-size: 24px"/>
                    <span class="ml-3 hidden group-hover:block md:block">Home</span>
                </a>

                <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/home/profile">
                    <Icon icon="hugeicons:profile-02" style="font-size: 24px"/>
                    <span class="ml-3 hidden group-hover:block md:block">Profile</span>
                </a>
            </div>
            <div class="mt-auto border-t">
                <a data-sveltekit-preload-data="tap" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/logout">
                    <Icon icon="hugeicons:logout-04" style="font-size: 24px"/>
                    <span class="ml-3 hidden group-hover:block md:block">Logout</span>
                </a>
                <a data-sveltekit-preload-data="tap" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/logout?all=true">
                    <Icon icon="hugeicons:logout-05" style="font-size: 24px"/>
                    <span class="ml-3 hidden group-hover:block md:block text-xs">Logout All Devices</span>
            </div>
        </div>
    </aside>
    <div class="grow">
        <slot></slot>
    </div>
</div>
