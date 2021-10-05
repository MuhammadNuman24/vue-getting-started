<template>
  <div>
    <h2>Hello World {{ hero.firstName }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HeroDetail',
  props: {
    herodetail: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
