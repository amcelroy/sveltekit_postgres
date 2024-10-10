<script lang="ts">
	import { cn } from "$lib/utils.js";
    import { Input } from "../ui/input";
	import * as Form from "../ui/form/index"
    import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
    import { schemaSignIn, type SchemaSignIn } from "$lib/validationSchemas";
    import { zodClient } from "sveltekit-superforms/adapters";

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;

	export let data: SuperValidated<Infer<SchemaSignIn>>;
	const form = superForm(data, {validators: zodClient(schemaSignIn)});
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
			</div>
		<Form.Button disabled={isLoading}>Submit</Form.Button>
		</div>
	  </form>
	  <div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
		</div>
	</div>
	<!-- <Button variant="outline" type="button" disabled={isLoading}>
		{#if isLoading}
			<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			<Icons.gitHub class="mr-2 h-4 w-4" />
		{/if}
		GitHub
	</Button> -->
</div>
