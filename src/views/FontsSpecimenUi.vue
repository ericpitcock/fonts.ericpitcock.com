<template>
  <div class="ui-container">
    <ep-flex class="app-header align-center justify-between pr-20 pl-20">
      <ep-input
        placeholder="Search"
        size="large"
      />
      <ep-action-bar v-bind="commonActionBarArgs" />
    </ep-flex>
    <div class="sidebar">
      sidebar
    </div>
    <div class="content">
      <ep-flex class="content__header align-center">
        <h1>Font Analytics</h1>
      </ep-flex>
      <ep-flex class="content__stats gap-20">
        <ep-flex
          v-for="stat in stats"
          :key="stat.title"
          class="stat flex-col gap-5"
        >
          <h3>{{ stat.title }}</h3>
          <h2>{{ stat.value }}</h2>
        </ep-flex>
      </ep-flex>
      <div class="content__charts">
        <!-- column chart of font count by category (sans-serif, etc) -->
        <!-- donut chart of usage distribution (ui, headlines, code, body copy) -->
      </div>
      <div class="content__table">
        table
      </div>
    </div>
  </div>
</template>

<script setup>
  import { faker } from '@faker-js/faker'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const commonActionBarArgs = {
    items: [
      {
        component: 'ep-button',
        props: {
          label: '',
          ariaLabel: 'Help',
          iconLeft: { name: 'help' },
          class: 'ep-button-var--ghost',
          action: () => console.log('the help button was clicked')
        },
      },
      {
        component: 'ep-dropdown',
        props: {
          buttonProps: {
            label: '',
            ariaLabel: 'Notifications',
            iconLeft: { name: 'notifications' },
            iconRight: undefined,
            class: 'ep-button-var--ghost'
          },
          menuClass: 'ep-menu-default',
          menuItems: [
            {
              id: faker.string.uuid(),
              label: 'Notifications',
              action: (item) => console.log('clicked', item.label),
            },
            {
              id: faker.string.uuid(),
              label: 'Alerts',
              action: (item) => console.log('clicked', item.label),
            },
            {
              id: faker.string.uuid(),
              label: 'Messages',
              action: (item) => console.log('clicked', item.label),
            },
            {
              divider: true
            },
            {
              id: faker.string.uuid(),
              label: 'Settings',
              action: (item) => console.log('clicked', item.label),
            }
          ],
          alignRight: true,
          showOnHover: false,
        }
      },
      {
        component: 'ep-dropdown',
        props: {
          buttonProps: {
            label: '',
            ariaLabel: 'User',
            iconLeft: { name: 'user' },
            iconRight: undefined,
            class: 'ep-button-var--ghost'
          },
          menuClass: 'ep-menu-default',
          menuItems: [
            {
              id: faker.string.uuid(),
              label: 'Profile',
              action: (item) => console.log('clicked', item.label),
            },
            {
              id: faker.string.uuid(),
              label: 'Switch account',
              action: (item) => console.log('clicked', item.label),
            },
            {
              id: faker.string.uuid(),
              label: 'Settings',
              action: (item) => console.log('clicked', item.label),
            },
            {
              divider: true
            },
            {
              id: faker.string.uuid(),
              label: 'Sign out',
              action: (item) => console.log('clicked', item.label),
            }
          ],
          alignRight: true,
          showOnHover: false,
        }
      }
    ],
  }

  const store = useStore()
  const totalFonts = computed(() => store.state.googleFonts.length)
  const recommendedFonts = computed(() => store.state.recommendedFonts.length)

  const fakeStatCount = () =>
    Number(
      faker.string.numeric({
        length: { min: 6, max: 8 },
        allowLeadingZeros: false,
      })
    ).toLocaleString()

  const stats = [
    {
      title: 'Total Fonts',
      value: totalFonts.value
    },
    {
      title: 'Recommended Fonts',
      value: recommendedFonts.value
    },
    {
      title: 'Total Downloads',
      value: fakeStatCount()
    },
    {
      title: 'Total Views',
      value: fakeStatCount()
    }
  ]
</script>

<style lang="scss" scoped>
  .ui-container {
    display: grid;
    grid-template-columns: 30rem 1fr;
    grid-template-rows: 6rem 1fr;
    // background: red;
    min-height: 100vh;

    h2 {
      font-size: var(--font-size--large);
      color: var(--text-color--loud);
    }

    h3 {
      font-family: v-bind('font.family');
      color: var(--text-color);
    }
  }

  .app-header {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    border-bottom: 1px solid var(--border-color);

    .ep-action-bar {
      width: auto;
    }
  }

  .sidebar {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    padding: 1rem;
    border-right: 1px solid var(--border-color);
  }

  .content {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: 8rem auto 1fr auto;
    padding: 0 3rem 3rem;
  }

  .content__header {
    grid-column: 1 / 9;
    grid-row: 1 / 2;
    padding-left: 0.2rem;
  }

  .content__stats {
    grid-column: 1 / 9;
    grid-row: 2 / 3;

    .stat {
      flex: 1;
      padding: 2rem 3rem;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius--large);
    }
  }

  .content__charts {
    grid-column: 1 / 9;
    grid-row: 3 / 4;
  }

  .content__table {
    grid-column: 1 / 9;
    grid-row: 4 / 5;
  }
</style>