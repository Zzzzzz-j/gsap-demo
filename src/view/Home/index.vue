<template>
  <div class="home-page">
    <div>count: {{ count }}</div>
    <a-button type="primary" @click="addCount">count++</a-button>
    <a-button type="primary" @click="minusCount">count--</a-button>
  </div>
</template>
<script lang="ts" setup>
import './index.scss';
import { useCount } from '@/store/useCount';

const { count } = storeToRefs(useCount());

function addCount() {
  count.value++;
}

function minusCount() {
  count.value--;
}
</script>
