<template>
  <div class="font-strings-sample">
    <div
      v-for="(string, index) in randomSpecimenArray"
      :key="index"
      class="fitty-text"
    >
      {{ string }}
    </div>
  </div>
</template>

<script setup>
  import fitty from 'fitty'
  import { onMounted } from 'vue'

  const specimenStrings = [
    [
      'Molecular structure',
      'Bits of stuff so small you wouldn’t believe it',
      'Carbon and hydrogen, flavored soda',
      'Late-night talk show circuit',
      'Gold, platinum, and semi-precious stones are discovered in the local landfills',
      'Prospector',
      'Residents from local communities stake claims',
      'Neighbors clash over pile of trash',
      'National Guard is summoned to restore Law & Order',
      'International media coverage',
      'Reporting live from under a heap of orange peels & coffee filters',
      'Volatile political incident',
      'Public calls on elected leaders for decisive action'
    ],
    [
      'Neutron bicycle',
      'Miscellaneous objects',
      'Magnetic field',
      'Reactions from heads of state',
      'Old renewal plan',
      'Black coffee',
      'Graduate student writes dissertation',
      'Lost blueprint',
      'Complete in 9 weeks'
    ],
    [
      'Summer vacation in Spain, all expenses paid',
      'Exoskeletal supports',
      'Footage from the 1928 Olympic Winter Games',
      'Sumerian law',
      'Lewis & Clark ventured into the Great Unknown',
      'Yukon',
      'Silver prices increase 543%',
      'Moderately heavy trading in all locations',
      'Federal Reserve',
      'Rules of supply & demand',
      'Marathon',
      '25,896 citizens scamper through the city',
      'Endurance',
      'Indefatigable athlete'
    ],
    [
      'Pyrotechnic',
      'Crazy Uncle Cletus just loves his collection of high-grade explosives',
      'Light fuse and get away!',
      'BLAM!',
      'We outfitted the cows with homemade earplugs',
      'Potent shock wave',
      'Mushroom clouds over the farm gave it a cozy touch',
      'The house imploded?',
      'Barn raised',
      'Uncle Cletus is not invited',
      'As he would certainly try to blow up the new barn',
      'Rocket fuel',
      'He started tinkering with Apollo engines – we moved to another town',
      'Rumbling & roaring'
    ],
    [
      'Square wave',
      'Clandestine police band receiver',
      '5389 MHz',
      '9 secret transmissions are intercepted',
      'Lunch order',
      'Secured-line red phone used for ordering calzones',
      'Frantic call for donuts',
      'Glazed',
      'City-wide emergency barely averted',
      'Sirens are turned off',
      'Mayor addresses the angry mob outside City Hall',
      'Celebration'
    ],
    [
      'Parliament',
      'Early election results contested',
      'Services rendered',
      'To King, Country & Family',
      'Patriotic sentiment honored in elaborate ceremony',
      'Renaissance',
      'Exhumation of historical sources',
      'Esoteric',
      'Modern architectural details',
      'Massachusetts'
    ],
    [
      'Huge moving truck',
      'All my possessions stuffed into cardboard boxes',
      'Continent',
      'From one coast to the other in 35 hours',
      'Trooper pulled me over for carrying a futon without a license',
      'Sleeping with intent to snore',
      'Heavy penalty',
      'After buying a quilt, I was released on my own recognizance',
      'The epic journey continued',
      'Still in transit',
      'I asked locals for directions to the highway',
      'They sang Sinatra’s “My Way” instead',
      'Record contract',
      'I offered them a twelve-album deal, with tour dates in 4,821,975 cities',
      'Dance hall',
      'International radio smash'
    ],
    [
      'Philosophers',
      'Scholars investigate true meaning of lint',
      'Deride',
      'Machiavellian schemes',
      'Ballistics',
      'Infantry exercises interrupted by heavy precipitation',
      'Blizzard watch in effect',
      'Thunderstorm',
      'Winds reported at 326 miles per hour',
      'Polo match melee',
      'Gauntlet',
      'Chaos on the front lawn'
    ],
    [
      'Traffic violations',
      'Trooper did not take kindly to my interpretive driving style',
      'Speeding',
      'Rush hour drivers become ever more frantic',
      'Construction ahead',
      'Torn up & plowed under',
      'Work crews play catch with gobs of hot asphalt',
      'Eastbound',
      'Full of honking and shouting',
      'Decrepit mufflers',
      'Visiting the drive-thru psychotherapist',
      'Apparently I suffer from an Oedipal stick shift',
      'High-octane prescription'
    ],
    [
      'Uptown platform',
      'We spent our first date changing lug nuts at the local power plant',
      'Kilometer',
      'Landscapes full of geological curiosities',
      'Recollections and memories',
      'Leather-bound scrapbooks filled with the souvenirs from our European travels',
      'Snapshot from Rome',
      'Generous gift from the local constable',
      'Expressing our thanks',
      'Global charts demonstrate the directions',
      'Distance',
      'Exacting measurements are carefully taken',
      'Communication',
      'I came home to clicking & tweeting answering machines',
      '563 useless messages waiting'
    ]
  ]

  const randomSpecimenArray = specimenStrings[Math.floor(Math.random() * specimenStrings.length)]

  onMounted(() => {
    setTimeout(() => {
      fitty('.fitty-text', {
        multiLine: false,
        minSize: 16,
        maxSize: 1024,
      })
    }, 100)
  })
</script>

<style lang="scss" scoped>
  .font-strings-sample {
    width: 100%;
    color: var(--text-color--loud);

    & > * + * {
      margin-top: 5rem;
    }
  }

  .specimen-line {
    width: 100%;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }

  .fitty-text {
    display: inline-block;
    white-space: nowrap;
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
  }
</style>