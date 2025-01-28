// Paleta de colores principal
export const COLORS = {
  // Colores principales
  primary: '#6200ee',
  secondary: '#03dac6',
  background: '#f5f5f5',
  surface: '#ffffff',
  error: '#b00020',
  success: '#4caf50',
  warning: '#ff9800',
  
  // Texto
  text: '#000000',
  
  // Grises
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Utilidades
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  
  // Estados
  disabled: '#9e9e9e',
  border: '#e0e0e0',
  
  // Colores de fondo
  card: '#ffffff',         // Blanco para tarjetas
  
  // Estados de interacción
  states: {
    pressed: 'rgba(0, 0, 0, 0.12)',
    hovered: 'rgba(0, 0, 0, 0.04)',
    focused: 'rgba(0, 0, 0, 0.12)',
  },
  
  // Bordes y divisores
  divider: '#e0e0e0',      // Gris claro para divisores
  
  // Colores de categorías de servicios
  categories: {
    haircut: '#FF6B6B',    // Corte
    styling: '#4ECDC4',    // Peinado
    color: '#45B7D1',      // Color
    treatment: '#96CEB4',  // Tratamiento
    manicure: '#D4A5A5',   // Manicure
    pedicure: '#9FA5D5',   // Pedicure
    makeup: '#E9967A',     // Maquillaje
    other: '#95A5A6',      // Otros
  },
  
  // Opacidades
  opacity: {
    disabled: 0.38,
    hint: 0.38,
    icon: 0.54,
    secondary: 0.6,
  }
} as const;

// Función auxiliar para agregar transparencia a colores
export const addAlpha = (color: string, opacity: number): string => {
  // Asegurarse de que la opacidad esté entre 0 y 1
  const validOpacity = Math.min(1, Math.max(0, opacity));
  return color + Math.round(validOpacity * 255).toString(16).padStart(2, '0');
};

// Función para obtener color de categoría
export const getCategoryColor = (category: string): string => {
  return (COLORS.categories as any)[category.toLowerCase()] || COLORS.categories.other;
}; 