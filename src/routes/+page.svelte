<script lang="ts">
    import Authform from "$lib/components/ui/Authform.svelte";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import * as Drawer from "$lib/components/ui/drawer";
	import Cookies from "js-cookie";

	export let data;

	$: navigator = {}

	let iOS = false;
	let macOS = false;
	let webAppInstalled = false;

	onMount(() => {
		if (browser) {
			if (window){
				navigator = window.navigator.userAgent;
				let nav_string = JSON.stringify(navigator);
				iOS = nav_string.includes("iPhone");
				macOS = nav_string.includes("Macintosh");
			}
		}
	})

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
		class="absolute right-4 top-4 md:right-8 md:top-8"
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
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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

{#if iOS}
	<Drawer.Root bind:open={iOS}>
		<Drawer.Content>
		<Drawer.Header>
			<Button>Install Webapp</Button>
			<Button>No Thanks</Button>
		</Drawer.Header>
		<Drawer.Footer>
			
		</Drawer.Footer>
		</Drawer.Content>
  	</Drawer.Root>		
{/if}

<style>
	.pennybacker {
		background-image: url("$lib/images/pennybacker.jpg");
	}
</style>