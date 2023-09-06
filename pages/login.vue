<template>
  <section>
    <UCard
      class="md:w-3/5 mx-auto mt-24 dark:bg-slate-800 shadow-lg rounded p-6"
    >
      <h1 class="text-xl font-semibold mb-4 text-center">Angkringan Mas Pur</h1>
      <h3 class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4">
        Login to your account to continue.
      </h3>
      <hr class="mb-8" />
      <form @submit.prevent="handleLogin">
        <div class="flex flex-col gap-y-4">
          <UFormGroup
            name="email"
            label="Email Address"
            class="space-y-2 w-full"
            help="We will never share your email with anyone else."
          >
            <UInput
              placeholder="youremail@gmail.com"
              class="py-2 rounded-md"
              v-model="email"
              icon="i-heroicons-envelope"
              :trailing-icon="
                isError ? 'i-heroicons-exclamation-triangle-20-solid' : ''
              "
          /></UFormGroup>
          <UFormGroup
            name="password"
            label="Your Password"
            class="space-y-2 w-full"
          >
            <UInput
              type="password"
              placeholder="*********"
              class="py-2 rounded-md"
              v-model="password"
              icon="i-heroicons-lock-closed"
          /></UFormGroup>

          <UButton
            block
            type="submit"
            label="Login"
            class="mt-2"
            :loading="loading"
          />

          <div
            class="w-full flex flex-col items-center justify-center gap-y-2 mt-2"
          >
            <span
              @click="isOpen = !isOpen"
              class="underline text-sm font-light cursor-pointer"
            >
              Forgot your password?
            </span>
            <NuxtLink to="/register" class="underline text-sm font-light">
              Don't have an account? Sign up.
            </NuxtLink>
          </div>
        </div>
      </form>
    </UCard>

    <!-- forgot password modal -->
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <h3 class="font-semibold">Forgot Your Password?</h3>
          <p class="font-light text-gray-500 text-sm">
            Enter the email address you used when registering.
          </p>
        </template>
        <form action="#" method="POST" @submit.prevent="forgotPassword">
          <div class="flex flex-col gap-y-3">
            <UFormGroup
              name="email"
              label="Email Address"
              class="space-y-2 w-full"
            >
              <UInput
                placeholder="youremail@gmail.com"
                class="py-2 rounded-md"
                v-model="email"
                icon="i-heroicons-envelope"
            /></UFormGroup>
            <UButton
              block
              type="submit"
              label="Confirm"
              class="mt-2"
              :loading="loading"
            />
          </div>
        </form>
      </UCard>
    </UModal>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Login Page',
});

const router = useRouter();
const supabase = useSupabaseClient();
const toast = useToast();

const loading = ref(false);
const email = ref('');
const password = ref('');
const isError = ref(false);
const isOpen = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;

    if (!email.value || !password.value)
      throw Error('Input form must be filled!');

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    router.push('/');
  } catch (error) {
    toast.add({
      id: 'gagal',
      title: error.message,
      icon: 'i-clarity-times-circle-line',
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
};

const forgotPassword = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: 'http://localhost:3000/update-password',
    });
    if (error) throw error;

    router.push({ name: 'UpdatePassword' });
  } catch (error) {
    toast.add({
      id: 'gagal',
      title: error.message,
      icon: 'i-clarity-times-circle-line',
      color: 'red',
    });
  } finally {
    loading.value = false;
  }
};
</script>
