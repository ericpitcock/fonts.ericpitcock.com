<template>
  <ep-table v-bind="tableProps">
    <!--  -->
  </ep-table>
</template>

<script setup>
  import nhl from '@/data/stanley-cup-wins'

  const tableProps = {
    columns: [
      {
        label: 'Team',
        key: 'team'
      },
      {
        label: 'Wins',
        key: 'wins'
      },
      {
        label: 'Appearances',
        key: 'appearances'
      }
    ],
    data: nhl
  }
</script>

<style></style>