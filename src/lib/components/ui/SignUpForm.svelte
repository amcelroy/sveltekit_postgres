<script lang="ts">
	import { cn } from "$lib/utils.js";
    import { Button } from "./button";
    import { Input } from "./input";
    import { Label } from "./label";

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
	<form method="POST">
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<Input
					id="email"
					name="email"
					placeholder="name@example.com"
					type="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/>
                <Label class="sr-only" for="email">Email</Label>
				<Input
					id="password"
					name="password"
					type="password"
					disabled={isLoading}
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				Create Account
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
	</div>
</div>