# 🎮 Next.js SSG & ISR Applications

Este proyecto contiene dos aplicaciones web desarrolladas con Next.js 15, implementando diferentes estrategias de renderizado: **Static Site Generation (SSG)**, **Incremental Static Regeneration (ISR)**, y **Client-Side Rendering (CSR)**.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── pokemon/                 # Aplicación Pokédex
│   │   ├── page.tsx            # Lista de Pokémon (ISR)
│   │   ├── [name]/             # Rutas dinámicas por nombre
│   │   │   └── page.tsx        # Detalle de Pokémon (SSG + ISR)
│   │   ├── layout.tsx          # Layout temático
│   │   ├── error.tsx           # Error Handler personalizado
│   │   └── not-found.tsx       # NotFound Handler
│   ├── rickandmorty/           # Aplicación Rick and Morty
│   │   ├── page.tsx            # Lista de personajes (ISR)
│   │   ├── [id]/               # Rutas dinámicas por ID
│   │   │   └── page.tsx        # Detalle de personaje (SSG + ISR)
│   │   ├── SearchComponent.tsx # Búsqueda en tiempo real (CSR)
│   │   ├── layout.tsx          # Layout temático
│   │   ├── error.tsx           # Error Handler personalizado
│   │   └── not-found.tsx       # NotFound Handler
│   ├── not-found.tsx           # NotFound global
│   └── layout.tsx              # Layout principal
├── types/
│   ├── pokemon.ts              # Tipos TypeScript para Pokémon
│   └── rickandmorty.ts         # Tipos TypeScript para Rick and Morty
└── ...
```

## 🎯 Aplicaciones Incluidas

### 1. 🐾 **Pokédex** (`/pokemon`)

**API utilizada:** [PokéAPI](https://pokeapi.co/)

#### Características:
- **Lista de Pokémon**: Muestra los primeros 151 Pokémon
- **Rutas dinámicas**: `/pokemon/[name]` (ej: `/pokemon/pikachu`)
- **ISR**: Revalidación cada 24 horas
- **Lazy Loading**: Imágenes cargadas bajo demanda
- **Error Handling**: Componente de error personalizado
- **NotFound**: Página 404 temática

#### Tecnologías implementadas:
- ✅ **SSG**: `generateStaticParams()` para pre-generar páginas
- ✅ **ISR**: `revalidate: 86400` (24 horas)
- ✅ **Metadata dinámica**: Títulos únicos por Pokémon
- ✅ **Tipos por colores**: Cada tipo tiene su color característico
- ✅ **Barras de progreso**: Visualización de estadísticas

#### Campos mapeados:
- ID, nombre, altura, peso
- Tipos (con colores)
- Estadísticas (HP, Attack, Defense, etc.)
- Habilidades (normales y ocultas)
- Imágenes oficiales

---

### 2. 🚀 **Rick and Morty Universe** (`/rickandmorty`)

**API utilizada:** [Rick and Morty API](https://rickandmortyapi.com/)

#### Características:
- **Lista de personajes**: Todos los personajes disponibles
- **Rutas dinámicas**: `/rickandmorty/[id]` (ej: `/rickandmorty/1`)
- **ISR**: Revalidación cada 10 días
- **Búsqueda en tiempo real**: CSR con debounce
- **Force Cache**: `cache: 'force-cache'` para SSG
- **Error Handling**: Componente de error personalizado
- ✅ **NotFound**: Página 404 temática

#### Tecnologías implementadas:
- ✅ **SSG**: `generateStaticParams()` para todos los personajes
- ✅ **ISR**: `revalidate: 864000` (10 días)
- ✅ **CSR**: Búsqueda en tiempo real con `useState` y `useEffect`
- ✅ **Debounce**: 300ms para optimizar peticiones
- ✅ **Metadata dinámica**: Títulos únicos por personaje
- ✅ **Colores por estado**: Alive (verde), Dead (rojo), Unknown (gris)
- ✅ **Colores por género**: Male (azul), Female (rosa), etc.

#### Campos mapeados:
- ID, nombre, estado, especie, tipo, género
- Ubicación de origen y actual
- Lista de episodios
- Fecha de creación
- URL de la API
- Imágenes de alta calidad

#### Búsqueda implementada:
- ✅ **Por nombre**: Búsqueda en tiempo real
- ✅ **Resultados limitados**: Máximo 5 resultados
- ✅ **UI interactiva**: Dropdown con resultados
- ✅ **Navegación**: Clic para ir al detalle

---

## 🛠️ Configuración Técnica

### **Next.js Config** (`next.config.ts`)
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // Pokémon images
      },
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com', // Rick and Morty images
      },
    ],
  },
};
```

### **Tipos TypeScript**
- **Pokémon**: `Pokemon`, `PokemonListResponse`, `SimplePokemon`
- **Rick and Morty**: `Character`, `CharactersResponse`, `SimpleCharacter`

---

## 🚀 Instalación y Uso

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone <repository-url>
cd next-ssg-isr-app

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar producción
npm run start
```

### **URLs de prueba**
- **Pokédex**: `http://localhost:3000/pokemon`
- **Rick and Morty**: `http://localhost:3000/rickandmorty`
- **Detalle Pokémon**: `http://localhost:3000/pokemon/pikachu`
- **Detalle Personaje**: `http://localhost:3000/rickandmorty/1`

---

## 📊 Estrategias de Renderizado

### **SSG (Static Site Generation)**
- **Cuándo se usa**: Páginas de detalle de Pokémon y personajes
- **Por qué**: Rendimiento óptimo y SEO perfecto
- **Implementación**: `generateStaticParams()` + `cache: 'force-cache'`

### **ISR (Incremental Static Regeneration)**
- **Pokémon**: Revalidación cada 24 horas
- **Rick and Morty**: Revalidación cada 10 días
- **Por qué**: Balance entre datos frescos y rendimiento
- **Implementación**: `next: { revalidate: seconds }`

### **CSR (Client-Side Rendering)**
- **Cuándo se usa**: Búsqueda en tiempo real
- **Por qué**: Necesita interactividad inmediata
- **Implementación**: `useState` + `useEffect` + debounce

---

## 🎨 UI/UX Features

### **Diseño Responsivo**
- Grid adaptativo para móviles y desktop
- Imágenes optimizadas con Next.js Image
- Hover effects y transiciones suaves

### **Temas Visuales**
- **Pokémon**: Colores púrpura/azul con badges de tipos
- **Rick and Morty**: Colores verde/azul/púrpura con estados de vida

### **Navegación**
- Breadcrumbs intuitivos
- Botones de regreso funcionales
- Enlaces internos optimizados

---

## 🔧 Error Handling

### **Componentes de Error**
- `error.tsx`: Maneja errores de runtime
- `not-found.tsx`: Maneja rutas inexistentes
- Diseño temático para cada aplicación
- Botones de recuperación funcionales

### **Logging**
- Errores registrados en consola (desarrollo)
- IDs de error para debugging
- Mensajes amigables para usuarios

---

## 📈 Performance

### **Optimizaciones implementadas**
- ✅ **Lazy Loading**: Imágenes cargadas bajo demanda
- ✅ **Image Optimization**: Next.js Image component
- ✅ **Static Generation**: Páginas pre-generadas
- ✅ **ISR**: Actualizaciones automáticas
- ✅ **Debounce**: Búsqueda optimizada
- ✅ **Force Cache**: Datos cacheados correctamente

### **Métricas esperadas**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

---

## 🚀 Deployment

### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Build de producción**
```bash
npm run build
# Genera páginas estáticas para todos los Pokémon y personajes
```

---

## 📚 Aprendizajes Técnicos

### **Next.js App Router**
- Rutas dinámicas con `[param]`
- Layouts anidados
- Metadata dinámica
- Error boundaries

### **Renderizado Híbrido**
- SSG para contenido estático
- ISR para contenido semi-dinámico
- CSR para interactividad

### **TypeScript**
- Tipado completo de APIs
- Interfaces reutilizables
- Type safety en runtime

### **Tailwind CSS**
- Diseño responsivo
- Componentes reutilizables
- Temas consistentes

---

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

## 👨‍💻 Autor

Desarrollado como parte del curso de **Desarrollo de Aplicaciones Web Avanzadas** - TECSUP

---

*¡Explora el mundo Pokémon y el universo de Rick and Morty con estas aplicaciones optimizadas!* 🎮✨