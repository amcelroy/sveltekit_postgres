<script lang="ts">
    import SignUpForm from "$lib/components/ui/SignUpForm.svelte";
</script>

<div class="container h-screen flex items-center justify-center ">
	<div>
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Create account</h1>
			<p class="text-muted-foreground text-sm">
				Enter your email below to create your account
			</p>
		</div>
		<SignUpForm/>
		<p class="text-muted-foreground px-8 text-center text-sm">
			By clicking "Create account", you agree to our
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
