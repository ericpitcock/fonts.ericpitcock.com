<template>
  <!-- <div>{{ getRandomNumber() }}</div> -->
  <table>
    <thead>
      <tr>
        <th>Team</th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Appearances</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="team in nhl">
        <td>{{ team.team }}</td>
        <td>{{ team.wins }}</td>
        <td>{{ team.appearances.length - team.wins }}</td>
        <td><span v-for="(year, index) in team.appearances">{{ year }}<span v-if="index + 1 < team.appearances.length">, </span></span></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import nhl from '@/data/stanley-cup-wins'
  var Chance = require('chance')
  
  export default {
    name: 'TableSample',
    data() {
      return {
        nhl
      }
    },
    methods: {
      getRandomNumber() {
        return chance.integer({ min: 0, max: 3000 })
      }
    }
  }
</script>

<style>

</style>