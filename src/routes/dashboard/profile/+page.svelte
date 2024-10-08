<script lang="ts">
    import { onMount } from 'svelte';
    import SuperDebug, { type SuperValidated, superForm, type Infer } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { schemaProfile, type SchemaProfile } from '$lib/validationSchemas.js';
    import * as Drawer from '$lib/components/ui/drawer';
    import { Button } from '$lib/components/ui/button';
    import ProfileForm from '$lib/components/ProfileForm.svelte';


    export let data: any;

    var profileComplete = (data.profileComplete as boolean);

    onMount(() => {
        console.log('Profile page mounted');
    });

</script>


{#if !profileComplete}
    <Drawer.Root open={!profileComplete} onOutsideClick={(event) => {event.preventDefault();}} dismissible={false}>
        <!-- <Drawer.Trigger asChild let:builder> -->
            <!-- <Button builders={[builder]} variant="outline">Open Drawer</Button> -->
        <!-- </Drawer.Trigger> -->
        <Drawer.Content>
            <div class="w-2/12 sm:w-2/12 md:w-4/12 lg:w-8/12 flex justify-center mx-auto mt-auto">
                <div class="">
                    <div class="p-1">
                        <p>We noticed you haven't completed your profile. Please fill out the form below.</p>
                    </div>
                    <ProfileForm {data} />
                </div>
            </div>
        </Drawer.Content>
    </Drawer.Root>
{:else}
    <ProfileForm {data} />
{/if}
<!-- <SuperDebug data={$formData} /> -->
