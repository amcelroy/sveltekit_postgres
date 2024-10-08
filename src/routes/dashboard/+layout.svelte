<script lang="ts">
    import "../../app.css";
</script>

<aside style="fixed top-0 left-0" aria-label="Sidenav">
    <div class="flex flex-col justify-between py-5 px-1 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-screen w-48">
        <div class="">
            <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/dashboard">
                <span class="ml-3">Dashboard</span>
            </a>

            <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/dashboard/profile">
                <span class="ml-3">Profile</span>
            </a>
        </div>
        <div class="mt-auto border-t">
            <a data-sveltekit-preload-data="tap" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/logout">
                <span class="ml-3">Logout</span>
            </a>
            <a data-sveltekit-preload-data="tap" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/logout?all=true">
                <span class="ml-3">Logout Everywhere</span>
            </a>
        </div>
    </div>
</aside>
<div class="p-4 sm:ml-64 fixed top-0">
    <slot></slot>
</div>  