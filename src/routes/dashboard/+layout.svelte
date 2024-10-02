<script lang="ts">
    import "../../app.css";
</script>

<aside style="fixed top-0 left-0" aria-label="Sidenav">
    <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-screen w-64">
        <nav>
            <ul>
                <li>
                    <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/dashboard">
                        <span class="ml-3">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" href="/dashboard/profile">
                        <span class="ml-3">Profile</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>
<div class="p-4 sm:ml-64 fixed top-0">
    <slot></slot>
</div>  