<template>
  <div v-if="selling" class="border rounded-lg p-6">
    <div>
      <h1 class="text-2xl font-bold">Angkringan Mas Pur</h1>
      <p class="mt-4">Taman Imbi, Jayapura Utara.</p>
    </div>

    <hr class="h-px my-8 bg-gray-200 border-0" />

    <div class="flex flex-col gap-y-3">
      <div
        v-for="(item, index) in selling.item_list"
        :key="index"
        class="flex items-center justify-between"
      >
        <div class="flex flex-col">
          <span class="font-medium capitalize text-lg">{{ item.name }}</span>
          <span class="font-light">{{ item.quantity }} x {{ item.price }}</span>
        </div>
        <span class="font-medium">{{ item.quantity * item.price }}</span>
      </div>
    </div>

    <hr class="h-px my-8 bg-gray-200 border-0" />

    <div class="flex items-center justify-between">
      <span class="font-semibold">Total Harga :</span>
      <span>Rp.{{ totalPrice }}</span>
    </div>
  </div>

  <div v-else>Loading....</div>
</template>

<script setup>
definePageMeta({
  name: 'Print',
  middleware: 'auth',
  layout: 'print',
});

const { id } = useRoute().params;
const { data: selling } = await useFetch(`/api/invoices/${id}`);
const totalPrice = ref(0);

// sum total price
for (const item of selling.value.item_list) {
  totalPrice.value += item.quantity * item.price;
}

if (selling.value !== null) {
  console.log('datanya ada');
} else {
  console.log('no data');
}
</script>
