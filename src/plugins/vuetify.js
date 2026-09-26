import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

const customLightTheme = {
  dark: false,
  colors: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    primary: '#007C89',
    'primary-darken-1': '#005A64',
    secondary: '#26A69A',
    'secondary-darken-1': '#00897B',
    accent: '#059669',
    error: '#EF4444',
    info: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B'
  }
}

const customDarkTheme = {
  dark: true,
  colors: {
    background: '#0F172A',
    surface: '#1E293B',
    primary: '#22D3EE',
    'primary-darken-1': '#0891B2',
    secondary: '#2DD4BF',
    error: '#F87171',
    info: '#60A5FA',
    success: '#34D399',
    warning: '#FBBF24'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme,
      customDarkTheme
    }
  },
  defaults: {
    VBtn: {
      rounded: 'md',
      style: 'text-transform: none; font-weight: 500;'
    },
    VCard: {
      rounded: 'lg',
      elevation: 1
    },
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary'
    },
    VSelect: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary'
    }
  }
})
