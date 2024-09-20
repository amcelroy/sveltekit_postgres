<script lang="ts" >
	import { cn } from "$lib/utils.js";
    import { Input } from "./input";
	import * as Form from "./form/index"
	import { superForm } from "sveltekit-superforms";
	import type { SuperValidated, Infer } from "sveltekit-superforms";
	import { schemaSignUp, type SchemaSignUp } from "$lib/validationSchemas";
    import { zodClient } from "sveltekit-superforms/adapters";

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;

	export let data: SuperValidated<Infer<SchemaSignUp>>;
	const form = superForm(data, {validators: zodClient(schemaSignUp)});
	const { form: formData, enhance } = form;

</script>

<div class={cn("grid gap-6 pt-4 pb-6", className)} {...$$restProps}>
	<form method="POST" use:enhance>
		<div class="grid gap-1">
			<div class="grid gap-1">
				<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Input {...attrs} bind:value={$formData.email} placeholder="user@email.com"/>
				</Form.Control>
				<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control let:attrs>
					<Input {...attrs} bind:value={$formData.password} placeholder="password" type="password"/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="confirmation">
					<Form.Control let:attrs>
					<Input {...attrs} bind:value={$formData.confirmation} placeholder="confirm password" type="password"/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
		<Form.Button disabled={isLoading}>Submit</Form.Button>
		</div>
	  </form>
</div>

<!-- <SuperDebug data={$formData} /> -->