// Cores principais do gradiente
export const gradientColors = {
  primary: '#036c8a',    // Azul escuro (esquerda)
  secondary: '#6cb9d3',  // Azul claro (direita)
}

export const primaryGradient = 'linear-gradient(180deg, #036c8a 0%, #6cb9d3 100%)'

export const colors = {
  primary: {
    50: '#f0f9ff',   // Muito claro
    100: '#e0f2fe',  // Claro
    200: '#bae6fd',  // Mais claro
    300: '#7dd3fc',  // Médio claro
    400: '#38bdf8',  // Médio
    500: '#6cb9d3',  // Secondary (nossa cor principal clara)
    600: '#4a9bc7',  // Mais escuro
    700: '#377ba8',  // Escuro
    800: '#2d5a80',  // Muito escuro
    900: '#036c8a',  // Primary (nossa cor principal escura)
  },
  
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Cores de estado
  success: {
    500: '#22c55e',
    600: '#16a34a',
  },
  
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },
  
  // Cores específicas do gradiente para uso direto
  gradient: {
    start: '#036c8a',
    end: '#6cb9d3',
    full: primaryGradient,
  }
}

// Função utilitária para criar gradientes personalizados
export const createGradient = (direction: string = '180deg', startColor: string = colors.gradient.start, endColor: string = colors.gradient.end) => {
  return `linear-gradient(${direction}, ${startColor} 0%, ${endColor} 100%)`
}

// Gradientes predefinidos
export const gradients = {
  primary: createGradient(),
  primaryVertical: createGradient('0deg'),
  primaryHorizontal: createGradient('90deg'),
  primaryDiagonal: createGradient('45deg'),
}
