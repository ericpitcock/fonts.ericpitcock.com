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
      <ep-menu
        class="fake-menu"
        size="large"
        :menu-items="fakeNavItems"
      />
    </div>
    <div class="content">
      <ep-flex class="content__header align-center">
        <h1 class="ui-heading">
          Font Analytics
        </h1>
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
      <ep-flex class="content__charts">
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
  import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useFontsStore } from '@/store/fontsStore'

  const props = defineProps({
    font: {
      type: Object,
      required: true
    }
  })

  const fakeNavItems = [
    {
      id: faker.string.uuid(),
      label: 'Dashboard',
      iconLeft: {
        name: 'dashboard'
      },
    },
    {
      id: faker.string.uuid(),
      label: 'Fonts',
      iconLeft: {
        name: 'f-bold',
      },
    },
    {
      id: faker.string.uuid(),
      label: 'Designers',
      iconLeft: {
        name: 'f-users'
      },
    },
    {
      id: faker.string.uuid(),
      label: 'Settings',
      iconLeft: {
        name: 'settings'
      },
    }
  ]

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

  const fontsStore = useFontsStore()
  const totalFonts = computed(() => fontsStore.googleFonts.length)
  const recommendedFonts = computed(() => fontsStore.recommendedFonts.length)

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
      value: totalFonts.value.toLocaleString()
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
    fontsStore.googleFonts.forEach(font => {
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

  let columnChartInstance = null
  let donutChartInstance = null

  // computed property to get getComputedStyle values
  const getCustomPropertyValue = (property) => {
    return getComputedStyle(document.documentElement).getPropertyValue(property)
  }

  const chartBackgroundColor = getCustomPropertyValue('--interface-surface--accent')
  const chartBorderColor = getCustomPropertyValue('--border-color--lighter')
  const chartTextColorLoud = getCustomPropertyValue('--text-color--loud')
  const chartGridColor = getCustomPropertyValue('--border-color')
  const chartTextColor = getCustomPropertyValue('--text-color')

  const handleResize = () => {
    // Force a complete redraw rather than just a resize
    if (columnChartInstance) {
      const columnCanvas = columnChartRef.value
      const columnParent = columnCanvas.parentNode
      const columnWidth = columnParent.clientWidth
      const columnHeight = columnParent.clientHeight

      columnCanvas.style.width = '100%'
      columnCanvas.style.height = '100%'
      columnCanvas.width = columnWidth
      columnCanvas.height = columnHeight
      columnChartInstance.resize()
    }

    if (donutChartInstance) {
      const donutCanvas = donutChartRef.value
      const donutParent = donutCanvas.parentNode
      const donutWidth = donutParent.clientWidth
      const donutHeight = donutParent.clientHeight

      donutCanvas.style.width = '100%'
      donutCanvas.style.height = '100%'
      donutCanvas.width = donutWidth
      donutCanvas.height = donutHeight
      donutChartInstance.resize()
    }
  }

  onMounted(() => {
    Chart.defaults.font.family = props.font.family

    columnChartInstance = new Chart(columnChartRef.value, {
      type: 'bar',
      data: {
        labels: Object.keys(fontCountsByCategory.value).map(category => category.charAt(0).toUpperCase() + category.slice(1)),
        datasets: [{
          label: 'Fonts by Category',
          data: Object.values(fontCountsByCategory.value),
          backgroundColor: chartBackgroundColor,
          borderColor: chartBorderColor,
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
            color: chartTextColorLoud,
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
        resizeDelay: 100,
        onResize: function(chart) {
          // Force a complete redraw after resize
          chart.resize()
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: chartTextColorLoud,
            }
          },
          y: {
            border: {
              display: false,
            },
            grid: {
              color: chartGridColor,
            },
            ticks: {
              color: chartTextColor,
            }
          },
        }
      }
    })

    donutChartInstance = new Chart(donutChartRef.value, {
      type: 'doughnut',
      data: {
        labels: Object.keys(usageDistribution),
        datasets: [{
          label: 'Usage Distribution',
          data: Object.values(usageDistribution),
          backgroundColor: chartBackgroundColor,
          borderColor: chartBorderColor,
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
              color: chartTextColorLoud,
              font: {
                size: 12
              }
            }
          },
          title: {
            align: 'center',
            display: true,
            text: 'Usage Distribution',
            color: chartTextColorLoud,
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
        resizeDelay: 100,
        onResize: function(chart) {
          // Force a complete redraw after resize
          chart.resize()
        },
      }
    })

    window.addEventListener('resize', handleResize)

    handleResize()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)

    if (columnChartInstance) {
      columnChartInstance.destroy()
    }
    if (donutChartInstance) {
      donutChartInstance.destroy()
    }
  })

  watch(() => fontsStore.theme, () => {
    const chartBackgroundColor = getCustomPropertyValue('--interface-surface--accent')
    const chartBorderColor = getCustomPropertyValue('--border-color--lighter')
    const chartTextColorLoud = getCustomPropertyValue('--text-color--loud')
    const chartGridColor = getCustomPropertyValue('--border-color')
    const chartTextColor = getCustomPropertyValue('--text-color')

    nextTick(() => {
      columnChartInstance.data.datasets[0].backgroundColor = chartBackgroundColor
      columnChartInstance.data.datasets[0].borderColor = chartBorderColor
      columnChartInstance.options.scales.x.ticks.color = chartTextColorLoud
      columnChartInstance.options.scales.y.ticks.color = chartTextColor
      columnChartInstance.options.scales.y.grid.color = chartGridColor
      columnChartInstance.options.plugins.title.color = chartTextColorLoud
      columnChartInstance.update()

      donutChartInstance.data.datasets[0].backgroundColor = chartBackgroundColor
      donutChartInstance.data.datasets[0].borderColor = chartBorderColor
      donutChartInstance.options.plugins.legend.labels.color = chartTextColorLoud
      donutChartInstance.options.plugins.title.color = chartTextColorLoud
      donutChartInstance.update()
    })
  })

  // table
  const columns = [
    {
      key: 'name',
      label: 'Font Name',
    },
    {
      key: 'category',
      label: 'Category',
    },
    {
      key: 'weight',
      label: 'Weight',
    },
    {
      key: 'downloads',
      label: 'Downloads',
      formatter: (value) => value.toLocaleString()
    }
  ]

  const googleFonts = [...fontsStore.googleFonts]

  const randomFonts = googleFonts.sort(() => Math.random() - Math.random()).slice(0, 20)
  const tableData = randomFonts.map(font => ({
    id: faker.string.uuid(),
    name: font.family,
    category: font.category,
    weight: font.variants[0],
    downloads: faker.number.int({ min: 100, max: 100000 })
  }))
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
      color: var(--text-color--quiet);
      text-transform: uppercase;
      letter-spacing: 0.1rem;
    }
  }

  .app-header {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    border-bottom: 1px solid var(--border-color);
    --ep-header-container-padding: 0 5rem;
    --ep-header-container-bg-color: var(--interface-surface);

    .ep-action-bar {
      width: auto;
    }
  }

  .sidebar {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    padding: 1rem;
    border-right: 1px solid var(--border-color);
    background: var(--interface-surface);
  }

  .fake-menu {
    --ep-menu-border-width: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 0 5rem 20rem 5rem;
    background: var(--interface-bg);
    overflow: auto;

    & > * {
      width: 100%;
      max-width: 120rem;
    }
  }

  .content__header {
    padding: 4rem 0 2rem 0.2rem;
  }

  .content__stats {
    .stat {
      flex: 1;
      padding: 2rem 3rem;
      background: var(--interface-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius--large);
    }
  }

  .content__charts {
    display: flex;
    gap: 2rem;

    .chart-container {
      position: relative;
      display: flex;
      justify-content: stretch;
      flex: 1;
      height: 300px;
      min-height: 200px;
      padding: 3rem 4rem;
      background: var(--interface-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius--large);
    }
  }

  .content__table {
    background: var(--interface-surface);
    padding: 2rem 3rem 3rem;
    border: 0.1rem solid var(--border-color);
    border-radius: var(--border-radius--large);

    .ep-table-container {
      --ep-table-width: 100%;
      --ep-table-header-bg-color: var(--interface-surface);
    }
  }
</style>