<script lang="ts">
    import { Input } from '$lib/components/ui/input';
    import * as Form from '$lib/components/ui/form/index';
    import { schemaProfile, type SchemaProfile } from '$lib/validationSchemas';
    import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { Label } from '../ui/label';

    export let data: SuperValidated<Infer<SchemaProfile>>;

    export let minimal = false;

    const form = superForm(data, {validators: zodClient(schemaProfile)});
    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="firstName">
        <Form.Control let:attrs>
            {#if minimal}
                <Label for="firstName">First Name</Label>
            {/if}
            <Input {...attrs} bind:value={$formData.firstName} placeholder="First Name"/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="lastName">
        <Form.Control let:attrs>
            {#if minimal}
                <Label for="lastName">Last Name</Label>
            {/if}
            <Input {...attrs} bind:value={$formData.lastName} placeholder="Last Name"/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="address">
        <Form.Control let:attrs>
            {#if minimal}
                <Label for="address">Address</Label>
            {/if}
            <Input {...attrs} bind:value={$formData.address} placeholder="Street Address"/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="city">
        <Form.Control let:attrs>
            {#if minimal}
                <Label for="city">City</Label>
            {/if}
            <Input {...attrs} bind:value={$formData.city} placeholder="City"/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="state">
        <Form.Control let:attrs>
            {#if minimal}
                <Label for="state">State</Label>
            {/if}
            <Input {...attrs} bind:value={$formData.state} placeholder="State"/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="zip">
        <Form.Control let:attrs>
            {#if minimal}
                <Label for="zip">Zipcode</Label>
            {/if}
            <Input {...attrs} bind:value={$formData.zip} placeholder="Zipcode"/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="phone">
        <Form.Control let:attrs>
            {#if minimal}
                <Label for="phone">Phone Number</Label>
            {/if}
            <Input {...attrs} bind:value={$formData.phone} placeholder="123-456-7890"/>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <div class="mx-auto flex justify-center pb-8">
        <Form.Button>Update</Form.Button>
    </div>
</form> 
