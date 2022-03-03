import { theme } from '../styles/theme';

export const optionsChart = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
    foreColor: theme.colors.purple[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.purple[600]
    },
    axisTicks: {
      color: theme.colors.purple[600]
    },
    categories: [
      'Completados',
      'Não Completados'
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityForm: 0.7,
      opacityTo: 0.3,
    }
  }
};