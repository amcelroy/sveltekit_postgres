<script lang="ts">
    import { browser } from "$app/environment";
    import Authform from "$lib/components/forms/Authform.svelte";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from "svelte";

	export let data;

	onMount(() => {

	});

</script>

<div class="md:hidden">
	<!-- <enhanced:img src={AuthenticationLight} alt="Authentication" class="block dark:hidden" />
	<enhanced:img src={AuthenticationDark} alt="Authentication" class="hidden dark:block" /> -->
</div>
<div
	class="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href="/signup"
		variant="ghost"
		class="flex right-0 top-0 md:absolute md:right-8 md:top-8"
	>
		Signup
	</Button>
	<div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-cover pennybacker"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			Company Name Here
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;Austin is Amazing!&rdquo;
				</p>
				<footer class="text-sm">Austin McElroy</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Login to account</h1>
				<p class="text-muted-foreground text-sm">
					Enter your email below to sign in to your account
				</p>
			</div>
			<Authform data={data.form}/>
			<p class="text-muted-foreground px-8 text-center text-sm">
				By clicking continue, you agree to our
				<a href="/terms" class="hover:text-primary underline underline-offset-4">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="hover:text-primary underline underline-offset-4">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>

<style>
	.pennybacker {
		background-image: url("$lib/images/pennybacker.jpg");
	}
</style>