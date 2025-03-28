<template>
  <div class="ui-container">
    <ep-header class="app-header">
      <template #left>
        <ep-input
          v-model="fakeSearch"
          placeholder="Search"
          size="large"
        />
      </template>
      <template #right>
        <ep-action-bar v-bind="commonActionBarArgs" />
      </template>
    </ep-header>
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
          <h3 class="ui-heading">{{ stat.title }}</h3>
          <h2>{{ stat.value }}</h2>
        </ep-flex>
      </ep-flex>
      <ep-flex class="content__charts pt-40 pb-40">
        <div class="chart-container">
          <canvas ref="columnChartRef" />
        </div>
        <div class="chart-container">
          <canvas ref="donutChartRef" />
        </div>
      </ep-flex>
      <div class="content__table">
        <ep-table
          :columns="columns"
          :data="tableData"
          :bordered="true"
          :striped="true"
          :selectable="true"
        >
          <template #thead="{ visibleColumns, cellWidths, showActionsMenu }">
            <ep-table-head
              :columns="visibleColumns"
              :cell-widths="cellWidths"
              :show-actions-menu="showActionsMenu"
            />
          </template>
        </ep-table>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { faker } from '@faker-js/faker'
  import { Chart } from 'chart.js/auto'
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'

  const props = defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const fakeSearch = ref('')

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
          menuProps: {
            class: 'ep-menu-default',
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
          },
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
          menuProps: {
            class: 'ep-menu-default',
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
          },
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

  // Refs for the chart canvases
  const columnChartRef = ref(null)
  const donutChartRef = ref(null)

  // Compute font counts by category from the Google Fonts data
  const fontCountsByCategory = computed(() => {
    const counts = {}
    store.state.googleFonts.forEach(font => {
      const category = font.category || 'unknown'
      counts[category] = (counts[category] || 0) + 1
    })
    return counts
  })

  // Fake usage distribution data for donut chart
  const usageDistribution = {
    UI: faker.number.int({ min: 100, max: 1000 }),
    Headlines: faker.number.int({ min: 100, max: 1000 }),
    Code: faker.number.int({ min: 100, max: 1000 }),
    'Body Copy': faker.number.int({ min: 100, max: 1000 })
  }

  onMounted(() => {
    Chart.defaults.font.family = props.font.family

    new Chart(columnChartRef.value, {
      type: 'bar',
      data: {
        labels: Object.keys(fontCountsByCategory.value).map(category => category.charAt(0).toUpperCase() + category.slice(1)),
        datasets: [{
          label: 'Fonts by Category',
          data: Object.values(fontCountsByCategory.value),
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--interface-surface--accent'),
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color--lighter'),
          borderWidth: 1
        }]
      },
      options: {
        // layout: {
        //   padding: 30
        // },
        plugins: {
          legend: {
            display: false
          },
          title: {
            align: 'center',
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-color--loud'),
            display: true,
            padding: {
              top: 0,
              bottom: 30
            },
            text: 'Fonts by Category',
            font: {
              size: 20
            },
          },
          tooltip: {
            enabled: false
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color--loud'),
            }
          },
          y: {
            border: {
              display: false,
            },
            grid: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-color')
            },
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
            }
          },
        }
      }
    })

    new Chart(donutChartRef.value, {
      type: 'doughnut',
      data: {
        labels: Object.keys(usageDistribution),
        datasets: [{
          label: 'Usage Distribution',
          data: Object.values(usageDistribution),
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--interface-surface--accent'),
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color--lighter'),
          borderWidth: 1
        }]
      },
      options: {
        // layout: {
        //   padding: {
        //     bottom: 30
        //   }
        // },
        plugins: {
          legend: {
            align: 'start',
            display: true,
            position: 'chartArea',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color--loud'),
              font: {
                size: 12
              }
            }
          },
          title: {
            align: 'center',
            display: true,
            text: 'Usage Distribution',
            color: getComputedStyle(document.documentElement).getPropertyValue('--text-color--loud'),
            font: {
              size: 20
            },
            padding: {
              top: 0,
              bottom: 30
            },
          },
          tooltip: {
            enabled: false
          }
        },
        radius: '80%',
        responsive: true,
        maintainAspectRatio: false,
      }
    })
  })

  // table
  const columns = [
    {
      key: 'name',
      label: 'Font Name',
      sortable: true,
      filterable: true,
      // formatter: (value) => value.toUpperCase()
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      filterable: true
    },
    {
      key: 'weight',
      label: 'Weight',
      sortable: true,
      sorter: (a, b) => {
        const weightOrder = ['Thin', 'Light', 'Regular', 'Medium', 'Bold', 'Black']
        return weightOrder.indexOf(a) - weightOrder.indexOf(b)
      }
    },
    {
      key: 'downloads',
      label: 'Downloads',
      sortable: true,
      formatter: (value) => value.toLocaleString()
    }
  ]

  const googleFonts = store.state.googleFonts

  // get 20 random fonts from googleFonts
  const randomFonts = googleFonts.sort(() => Math.random() - Math.random()).slice(0, 20)
  // generate table data from randomFonts
  const tableData = randomFonts.map(font => ({
    id: faker.string.uuid(),
    name: font.family,
    category: font.category,
    weight: font.variants[0],
    downloads: faker.number.int({ min: 100, max: 100000 })
  }))

  // const tableData = Array.from({ length: 20 }, () => ({
  //   id: faker.string.uuid(),
  //   name: faker.lorem.word({ length: { min: 5, max: 15 } }) + ' Font',
  //   category: faker.helpers.arrayElement(['Serif', 'Sans-Serif', 'Display', 'Handwriting', 'Monospace']),
  //   weight: faker.helpers.arrayElement(['Thin', 'Light', 'Regular', 'Medium', 'Bold', 'Black']),
  //   downloads: faker.number.int({ min: 100, max: 100000 })
  // }))
</script>

<style lang="scss" scoped>
  .specimen {
    height: 100%;
  }

  .fonts-grid__main {
    overflow: hidden;
  }

  .ui-container {
    display: grid;
    grid-template-columns: 30rem 1fr;
    grid-template-rows: 6rem 1fr;
    min-height: 100%;
    overflow: hidden;

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
    --ep-header-container-padding: 0 5rem;

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
    padding: 0 5rem 20rem 5rem;
    overflow: auto;
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
      background: var(--interface-foreground);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius--large);
    }
  }

  .content__charts {
    grid-column: 1 / 9;
    grid-row: 3 / 4;
    display: flex;
    gap: 2rem;

    .chart-container {
      position: relative;
      display: flex;
      justify-content: stretch;
      flex: 1;
      position: relative;
      height: 35rem;
      padding: 3rem 4rem;
      background: var(--interface-foreground);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius--large);
    }
  }

  .content__table {
    grid-column: 1 / 9;
    grid-row: 4 / 5;

    .ep-table-container {
      --ep-table-width: 100%;
    }
  }
</style>